import type { ComponentType } from 'react'
import { S01Splash } from './S01Splash'
import { S02MotionCarousel } from './S02MotionCarousel'
import { S03WelcomeSignUp } from './S03WelcomeSignUp'
import { S03bOtpVerification } from './S03bOtpVerification'
import { S03cConsent } from './S03cConsent'
import { S03dCompleteProfile } from './S03dCompleteProfile'
import { S03eWhatsappEnrollment } from './S03eWhatsappEnrollment'
import { S04SignIn } from './S04SignIn'
import { S05ForgotPassword } from './S05ForgotPassword'
import { S05bResetPassword } from './S05bResetPassword'
import { S06GuestModePreview } from './S06GuestModePreview'
import { S07CiaOnboarding } from './S07CiaOnboarding'
import { S08InitialPlanSummary } from './S08InitialPlanSummary'
import { S65ForceUpdate } from './S65ForceUpdate'
import { S66NotificationPermission } from './S66NotificationPermission'

export const authScreens = {
  '01': S01Splash,
  '02': S02MotionCarousel,
  '03': S03WelcomeSignUp,
  '03b': S03bOtpVerification,
  '03c': S03cConsent,
  '03d': S03dCompleteProfile,
  '03e': S03eWhatsappEnrollment,
  '04': S04SignIn,
  '05': S05ForgotPassword,
  '05b': S05bResetPassword,
  '06': S06GuestModePreview,
  '07': S07CiaOnboarding,
  '08': S08InitialPlanSummary,
  '65': S65ForceUpdate,
  '66': S66NotificationPermission,
} satisfies Record<string, ComponentType>
