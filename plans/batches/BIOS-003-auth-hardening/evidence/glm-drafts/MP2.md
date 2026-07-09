=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/auth.ts ===
import { apiFetch } from '@/services/api/client';
import type {
  CompleteProfileRequest,
  CompleteProfileResponse,
  ConsentRequest,
  ConsentResponse,
  ForgotPasswordRequest,
  RegisterRequest,
  RegisterResponse,
  ResendRegistrationOtpRequest,
  ResendRegistrationOtpResponse,
  ResetPasswordRequest,
  SkipWhatsAppResponse,
  SocialAuthRequest,
  SocialAuthResponse,
  VerifyRegistrationRequest,
  VerifyRegistrationResponse,
} from '@/services/api/dto/auth';

export function register(payload: RegisterRequest) {
  return apiFetch<RegisterResponse>('/auth/register', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function verifyRegistration(payload: VerifyRegistrationRequest) {
  return apiFetch<VerifyRegistrationResponse>('/auth/verify-registration', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function resendRegistrationOtp(payload: ResendRegistrationOtpRequest) {
  return apiFetch<ResendRegistrationOtpResponse>('/auth/resend-registration-otp', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function socialAuth(payload: SocialAuthRequest) {
  return apiFetch<SocialAuthResponse>('/auth/social', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function forgotPassword(payload: ForgotPasswordRequest) {
  return apiFetch<null>('/auth/forgot-password', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function resetPassword(payload: ResetPasswordRequest) {
  return apiFetch<null>('/auth/reset-password', {
    method: 'POST',
    body: payload,
    skipAuth: true,
  });
}

export function submitConsent(payload: ConsentRequest) {
  return apiFetch<ConsentResponse>('/auth/consent', {
    method: 'POST',
    body: payload,
  });
}

export function completeProfile(payload: CompleteProfileRequest) {
  return apiFetch<CompleteProfileResponse>('/auth/complete-profile', {
    method: 'POST',
    body: payload,
  });
}

export function skipWhatsApp() {
  return apiFetch<SkipWhatsAppResponse>('/auth/whatsapp/skip', {
    method: 'POST',
  });
}
=== END FILE ===

=== FILE: /Users/hamza/Desktop/balencia-design/yhealth-app/mobile/src/services/api/dto/auth.ts ===
export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export type NextStep = 'consent' | 'complete_profile' | 'whatsapp_enrollment' | 'assessment';

export interface PublicUserProfileDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  gender: Gender | null;
  phone: string | null;
  role: 'user' | 'admin';
  avatarUrl: string | null;
  isEmailVerified: boolean;
  onboardingStatus: OnboardingStatusDto;
  createdAt: string;
  updatedAt: string;
}

export interface AuthTokensDto {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface LoginResponseDto {
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

export interface MeResponseDto {
  user: PublicUserProfileDto;
}

export interface OnboardingStatusDto {
  currentStep: string;
  steps: string[];
  isComplete: boolean;
  completedAt: string | null;
}

export type LogoutResponseDto = null;

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface RegisterResponse {
  message: string;
  activationToken: string;
}

export interface VerifyRegistrationRequest {
  activationToken: string;
  activationCode: string;
}

export interface VerifyRegistrationResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

export interface ResendRegistrationOtpRequest {
  activationToken: string;
}

export interface ResendRegistrationOtpResponse {
  message: string;
  activationToken: string;
}

export interface SocialAuthRequest {
  email: string;
  provider: 'apple' | 'google';
  providerId: string;
  idToken?: string;
  accessToken?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export interface SocialAuthResponse {
  nextStep: NextStep;
  isNewUser: boolean;
  needsProfileCompletion: boolean;
  user: PublicUserProfileDto;
  tokens: AuthTokensDto;
}

export interface ForgotPasswordRequest {
  email: string;
}

export type ForgotPasswordResponse = null;

export interface ResetPasswordRequest {
  email: string;
  otp: string;
  password: string;
  confirmPassword: string;
}

export type ResetPasswordResponse = null;

export interface ConsentRequest {
  termsOfService: boolean;
  privacyPolicy: boolean;
  emailMarketing: boolean;
  whatsAppCoaching: boolean;
}

export interface ConsentResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
}

export interface CompleteProfileRequest {
  firstName?: string;
  lastName?: string;
  dateOfBirth: string;
  gender: Gender;
}

export interface CompleteProfileResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
}

export interface SkipWhatsAppResponse {
  nextStep: NextStep;
  user: PublicUserProfileDto;
}
=== END FILE ===
