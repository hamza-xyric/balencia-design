=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/auth/social.ts ===
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { useMemo } from 'react';

import { socialAuth } from '@/services/api/auth';
import type { SocialAuthResponse } from '@/services/api/dto/auth';
import { Env } from '@/config/env';

WebBrowser.maybeCompleteAuthSession();

export type SocialSignInResult =
  | { kind: 'success'; response: SocialAuthResponse }
  | { kind: 'unavailable'; reason: string }
  | { kind: 'cancelled' }
  | { kind: 'error'; message: string };

export async function appleSignIn(): Promise<SocialSignInResult> {
  try {
    const available = await AppleAuthentication.isAvailableAsync();
    if (!available) {
      return { kind: 'unavailable', reason: 'apple-auth-unavailable' };
    }

    const credential = await AppleAuthentication.signInAsync({
      requestedScopes: [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ],
    });

    if (credential.identityToken === null) {
      return { kind: 'error', message: 'Apple did not return an identity token.' };
    }

    const apiResponse = await socialAuth({
      provider: 'apple',
      email: credential.email ?? '',
      idToken: credential.identityToken,
      firstName: credential.fullName?.givenName ?? undefined,
      lastName: credential.fullName?.familyName ?? undefined,
      providerId: credential.user,
    });

    return { kind: 'success', response: apiResponse };
  } catch (error) {
    if ((error as { code?: string })?.code === 'ERR_REQUEST_CANCELED') {
      return { kind: 'cancelled' };
    }
    const message = error instanceof Error ? error.message : 'Apple sign-in failed.';
    return { kind: 'error', message };
  }
}

export type UseGoogleSignInResult = {
  available: boolean;
  reason?: string;
  signIn(): Promise<SocialSignInResult>;
};

export function useGoogleSignIn(): UseGoogleSignInResult {
  const [request, , promptAsync] = Google.useIdTokenAuthRequest({
    iosClientId: Env.googleIosClientId,
    webClientId: Env.googleWebClientId,
  });

  return useMemo<UseGoogleSignInResult>(() => {
    if (!request || !Env.googleIosClientId || !Env.googleWebClientId) {
      return {
        available: false,
        reason: 'google-client-id-missing',
        signIn: async () => ({ kind: 'unavailable', reason: 'google-client-id-missing' }),
      };
    }

    return {
      available: true,
      signIn: async (): Promise<SocialSignInResult> => {
        try {
          const result = await promptAsync();

          if (result.type === 'success') {
            const idToken = result.params?.id_token;
            if (!idToken) {
              return { kind: 'error', message: 'Google did not return an identity token.' };
            }
            const apiResponse = await socialAuth({ provider: 'google', email: '', idToken });
            return { kind: 'success', response: apiResponse };
          }

          if (result.type === 'cancel' || result.type === 'dismiss') {
            return { kind: 'cancelled' };
          }

          return { kind: 'error', message: 'Google sign-in failed.' };
        } catch (error) {
          const message = error instanceof Error ? error.message : 'Google sign-in failed.';
          return { kind: 'error', message };
        }
      },
    };
  }, [request, promptAsync]);
}
