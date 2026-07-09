=== FILE: src/modules/auth/__tests__/registration-flow.test.ts ===
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockCreateUser = vi.fn();
const mockSignInWithPassword = vi.fn();
const mockSendOtp = vi.fn();
const mockVerifyOtp = vi.fn();

vi.mock('@/services/amber/client', () => ({
  amber: {
    auth: {
      createUser: mockCreateUser,
      signInWithPassword: mockSignInWithPassword,
      sendOtp: mockSendOtp,
      verifyOtp: mockVerifyOtp,
    },
  },
}));

import { registerUser } from './registration-flow';

describe('registerUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns success when email is valid and password meets requirements', async () => {
    mockCreateUser.mockResolvedValue({ id: '123' });
    const result = await registerUser({ email: 'test@example.com', password: 'ValidPass123!' });
    expect(result.success).toBe(true);
  });

  it('returns an error when the email is missing an @ symbol', async () => {
    const result = await registerUser({ email: 'invalid-email', password: 'ValidPass123!' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('email');
  });

  it('returns an error when the password is strictly less than 8 characters', async () => {
    const result = await registerUser({ email: 'test@example.com', password: 'Short1!' });
    expect(result.success).toBe(false);
    expect(result.error).toContain('password');
  });
});
=== END FILE ===

=== FILE: src/modules/auth/__tests__/forgot-normalize.test.ts ===
import { describe, it, expect } from 'vitest';
import { normalizeEmail } from './forgot-normalize';

describe('normalizeEmail', () => {
  it('trims leading and trailing whitespace', () => {
    expect(normalizeEmail('  user@example.com  ')).toBe('user@example.com');
  });

  it('lowercases the local part and domain', () => {
    expect(normalizeEmail('USER@EXAMPLE.COM')).toBe('user@example.com');
  });

  it('strips dots from the local part for supported providers (gmail)', () => {
    expect(normalizeEmail('u.s.e.r@gmail.com')).toBe('user@gmail.com');
  });
});
=== END FILE ===

=== FILE: src/services/device/__tests__/device.test.ts ===
import { describe, it, expect, vi, beforeEach } from 'vitest';

const mockSetItemAsync = vi.fn().mockResolvedValue(undefined);
const mockGetItemAsync = vi.fn().mockResolvedValue(null);
const mockRandomUUID = vi.fn().mockReturnValue('mock-uuid-123');

vi.mock('expo-secure-store', () => ({
  setItemAsync: mockSetItemAsync,
  getItemAsync: mockGetItemAsync,
}));

vi.mock('expo-crypto', () => ({
  randomUUID: mockRandomUUID,
}));

describe('getDeviceId', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.resetModules();
  });

  it('generates and stores a new device id if none exists', async () => {
    const { getDeviceId } = await import('./device');
    const id = await getDeviceId();
    expect(id).toBe('mock-uuid-123');
    expect(mockSetItemAsync).toHaveBeenCalledWith('device_id', 'mock-uuid-123');
  });

  it('retrieves the existing device id from storage', async () => {
    mockGetItemAsync.mockResolvedValueOnce('stored-id-456');
    const { getDeviceId } = await import('./device');
    const id = await getDeviceId();
    expect(id).toBe('stored-id-456');
    expect(mockSetItemAsync).not.toHaveBeenCalled();
  });

  it('implements single-flight logic to prevent duplicate generation', async () => {
    const { getDeviceId } = await import('./device');
    await Promise.all([getDeviceId(), getDeviceId()]);
    expect(mockRandomUUID).toHaveBeenCalledTimes(1);
    expect(mockSetItemAsync).toHaveBeenCalledTimes(1);
  });
});
=== END FILE ===

=== FILE: src/modules/auth/__tests__/next-step.test.ts ===
import { describe, it, expect } from 'vitest';
import { resolveNextStep } from './next-step';

describe('resolveNextStep', () => {
  it('routes to OTP verification when a challenge is required', () => {
    const result = resolveNextStep({ status: 'challenge_required', channel: 'email' });
    expect(result).toBe('/verify-otp');
  });

  it('routes to the home dashboard on completed authentication', () => {
    const result = resolveNextStep({ status: 'complete' });
    expect(result).toBe('/');
  });
});
=== END FILE ===

=== FILE: src/modules/auth/__tests__/mask-email.test.ts ===
import { describe, it, expect } from 'vitest';
import { maskEmail } from './mask-email';

describe('maskEmail', () => {
  it('preserves the first character and masks the rest of the local part for long strings', () => {
    expect(maskEmail('username@example.com')).toBe('u*******@example.com');
  });

  it('returns the email untouched if there is no @ symbol', () => {
    expect(maskEmail('invalid-email')).toBe('invalid-email');
  });

  it('masks correctly for a 1-character local part', () => {
    expect(maskEmail('u@example.com')).toBe('u@example.com');
  });
});
=== END FILE ===
