=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/package.json ===
{
  "name": "yhealth-app-mobile",
  "version": "1.0.0",
  "main": "index.ts",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "web": "expo start --web",
    "test": "jest",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/native-stack": "^6.9.17",
    "@xstate/react": "^4.1.0",
    "expo": "~57.0.0",
    "expo-asset": "~9.0.0",
    "expo-constants": "~15.0.0",
    "expo-crypto": "~57.0.0",
    "expo-device": "~6.0.0",
    "expo-secure-store": "~13.0.0",
    "react": "18.2.0",
    "react-native": "0.73.4",
    "xstate": "^5.9.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@types/react": "~18.2.45",
    "typescript": "^5.3.0"
  },
  "private": true
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/client.ts ===
import * as SecureStore from 'expo-secure-store';

import { ApiError } from './errors';

export const API_BASE_URL = 'https://api.yhealth.com';

const AUTH_TOKEN_KEY = 'yhealth_auth_token';
const AUTH_REFRESH_TOKEN_KEY = 'yhealth_refresh_token';

type AuthTokenProvider = () => Promise<string | null>;
type AuthRefreshProvider = () => Promise<string | null>;
type AuthTokenSetter = (token: string) => Promise<void>;
type AuthRefreshSetter = (token: string) => Promise<void>;
type DeviceHeadersProvider = () => Promise<Record<string, string>>;

let authTokenProvider: AuthTokenProvider = async () => {
  return SecureStore.getItemAsync(AUTH_TOKEN_KEY);
};

let authRefreshProvider: AuthRefreshProvider = async () => {
  return SecureStore.getItemAsync(AUTH_REFRESH_TOKEN_KEY);
};

let authTokenSetter: AuthTokenSetter = async (token: string) => {
  await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
};

let authRefreshSetter: AuthRefreshSetter = async (token: string) => {
  await SecureStore.setItemAsync(AUTH_REFRESH_TOKEN_KEY, token);
};

let onAuthError: () => Promise<void> = async () => {
  await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
  await SecureStore.deleteItemAsync(AUTH_REFRESH_TOKEN_KEY);
};

let deviceHeadersProvider: DeviceHeadersProvider = async () => {
  return {};
};

export function setAuthTokenProvider(provider: AuthTokenProvider) {
  authTokenProvider = provider;
}

export function setAuthRefreshProvider(provider: AuthRefreshProvider) {
  authRefreshProvider = provider;
}

export function setAuthTokenSetter(setter: AuthTokenSetter) {
  authTokenSetter = setter;
}

export function setAuthRefreshSetter(setter: AuthRefreshSetter) {
  authRefreshSetter = setter;
}

export function setOnAuthError(handler: () => Promise<void>) {
  onAuthError = handler;
}

export function setDeviceHeadersProvider(provider: DeviceHeadersProvider) {
  deviceHeadersProvider = provider;
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

async function attemptFetch(endpoint: string, options: FetchOptions = {}): Promise<Response> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (!options.skipAuth) {
    const token = await authTokenProvider();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const deviceHeaders = await deviceHeadersProvider();
  Object.assign(headers, deviceHeaders);

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
}

export async function apiFetch<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
  let response = await attemptFetch(endpoint, options);

  if (response.status === 401 && !options.skipAuth) {
    try {
      const refreshResponse = await attemptFetch('/auth/refresh', {
        method: 'POST',
        skipAuth: true,
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        await authTokenSetter(refreshData.accessToken);
        await authRefreshSetter(refreshData.refreshToken);
        
        response = await attemptFetch(endpoint, options);
      } else {
        await onAuthError();
        throw new ApiError('Session expired', 401);
      }
    } catch (error) {
      await onAuthError();
      throw new ApiError('Session expired', 401);
    }
  }

  if (!response.ok) {
    let errorBody;
    try {
      errorBody = await response.json();
    } catch (e) {
      throw new ApiError('Network request failed', response.status);
    }
    throw new ApiError(errorBody.message || 'Network request failed', response.status, errorBody);
  }

  return response.json();
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/device.ts ===
import * as Crypto from 'expo-crypto';
import * as Device from 'expo-device';
import * as SecureStore from 'expo-secure-store';

const DEVICE_ID_KEY = 'yhealth_device_id';

let memoizedDeviceId: string | null = null;
let deviceIdPromise: Promise<string> | null = null;

export async function getDeviceId(): Promise<string> {
  if (memoizedDeviceId) {
    return memoizedDeviceId;
  }

  if (deviceIdPromise) {
    return deviceIdPromise;
  }

  deviceIdPromise = (async () => {
    const storedId = await SecureStore.getItemAsync(DEVICE_ID_KEY);
    
    if (storedId) {
      memoizedDeviceId = storedId;
      return storedId;
    }

    const uuid = Crypto.randomUUID();
    await SecureStore.setItemAsync(DEVICE_ID_KEY, uuid);
    memoizedDeviceId = uuid;
    return uuid;
  })();

  try {
    return await deviceIdPromise;
  } finally {
    deviceIdPromise = null;
  }
}

export function getDeviceName(): string {
  if (Device.deviceName) {
    return Device.deviceName;
  }
  return 'Unknown Device';
}

export async function getDeviceHeaders(): Promise<Record<string, string>> {
  const deviceId = await getDeviceId();
  const deviceName = getDeviceName();
  
  return {
    'X-Device-Id': deviceId,
    'X-Device-Name': deviceName,
  };
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-machine.ts ===
import { assign, createMachine, StateMachine } from 'xstate';

export type AuthStatus = 'unauthenticated' | 'authenticating' | 'authenticated';

export interface SessionMachineContext {
  status: AuthStatus;
  error: string | null;
}

export type SessionMachineEvent = 
  | { type: 'SIGN_IN_START' }
  | { type: 'SIGN_IN_SUCCESS' }
  | { type: 'SIGN_IN_ERROR'; error: string }
  | { type: 'SIGN_OUT' }
  | { type: 'HYDRATED'; isAuthenticated: boolean };

export const sessionMachine = createMachine<SessionMachineContext, SessionMachineEvent>({
  id: 'session',
  initial: 'uninitialized',
  schema: {
    context: {} as SessionMachineContext,
    events: {} as SessionMachineEvent,
  },
  context: {
    status: 'unauthenticated',
    error: null,
  },
  states: {
    uninitialized: {
      on: {
        HYDRATED: {
          target: 'resolved',
          actions: assign({
            status: (context, event) => 
              event.isAuthenticated ? 'authenticated' : 'unauthenticated',
          }),
        },
      },
    },
    resolved: {
      on: {
        SIGN_IN_START: {
          target: 'authenticating',
        },
        SIGN_IN_SUCCESS: {
          target: 'resolved',
          actions: assign({
            status: () => 'authenticated',
            error: () => null,
          }),
        },
        SIGN_OUT: {
          target: 'resolved',
          actions: assign({
            status: () => 'unauthenticated',
            error: () => null,
          }),
        },
      },
    },
    authenticating: {
      on: {
        SIGN_IN_SUCCESS: {
          target: 'resolved',
          actions: assign({
            status: () => 'authenticated',
            error: () => null,
          }),
        },
        SIGN_IN_ERROR: {
          target: 'resolved',
          actions: assign({
            status: () => 'unauthenticated',
            error: (_, event) => event.error,
          }),
        },
      },
    },
  },
});
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session.ts ===
import * as SecureStore from 'expo-secure-store';

const ACCESS_TOKEN_KEY = 'yhealth_access_token';
const REFRESH_TOKEN_KEY = 'yhealth_refresh_token';

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export async function saveSession(tokens: AuthTokens): Promise<void> {
  await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, tokens.accessToken);
  await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, tokens.refreshToken);
}

export async function getSession(): Promise<AuthTokens | null> {
  const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);
  const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  
  if (!accessToken || !refreshToken) {
    return null;
  }
  
  return { accessToken, refreshToken };
}

export async function clearSession(): Promise<void> {
  // Sessions are tracked per-device. This clears the local SecureStore tokens,
  // invalidating access on this specific device without revoking the core user session.
  await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
  await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/session-provider.tsx ===
import React, { createContext, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { useMachine } from '@xstate/react';

import { sessionMachine, SessionMachineEvent } from './session-machine';
import { getSession, saveSession, clearSession, AuthTokens } from './session';
import { getDeviceHeaders } from './device';
import { setDeviceHeadersProvider } from '../api/client';

interface User {
  id: string;
  email: string;
  name: string;
}

interface SessionContextValue {
  status: 'unauthenticated' | 'authenticating' | 'authenticated';
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  adoptSession: (tokens: AuthTokens, user: User) => Promise<void>;
}

const SessionContext = createContext<SessionContextValue | undefined>(undefined);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, send] = useMachine(sessionMachine);
  const [user, setUser] = useState<User | null>(null);
  const isHydrating = useRef(true);

  useEffect(() => {
    setDeviceHeadersProvider(getDeviceHeaders);
  }, []);

  useEffect(() => {
    async function hydrate() {
      const session = await getSession();
      
      if (session) {
        setUser({
          id: 'hydrated-user',
          email: 'user@example.com',
          name: 'Hydrated User'
        });
        send({ type: 'HYDRATED', isAuthenticated: true });
      } else {
        send({ type: 'HYDRATED', isAuthenticated: false });
      }
      isHydrating.current = false;
    }
    hydrate();
  }, []);

  const value = useMemo<SessionContextValue>(() => ({
    status: state.context.status,
    error: state.context.error,
    signIn: async (email, password) => {
      send({ type: 'SIGN_IN_START' });
      try {
        const response = await fetch('https://api.yhealth.com/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();
        await saveSession({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        
        setUser(data.user);
        send({ type: 'SIGN_IN_SUCCESS' });
      } catch (err) {
        send({ type: 'SIGN_IN_ERROR', error: 'Invalid credentials' });
        throw err;
      }
    },
    signOut: async () => {
      await clearSession();
      setUser(null);
      send({ type: 'SIGN_OUT' });
    },
    adoptSession: async (tokens, adoptedUser) => {
      await saveSession(tokens);
      setUser(adoptedUser);
      send({ type: 'SIGN_IN_SUCCESS' });
    },
  }), [state.context]);

  return (
    <SessionContext.Provider value={value}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}
=== END FILE ===
