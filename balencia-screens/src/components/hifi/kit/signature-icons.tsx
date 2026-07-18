type SignatureBaseProps = Omit<React.SVGProps<SVGSVGElement>, 'children'> & {
  size?: number
  strokeWidth?: number
}

export type SignatureIconProps = SignatureBaseProps & {
  active?: boolean
}

function SignatureIcon({
  size = 24,
  strokeWidth,
  children,
  'aria-label': ariaLabel,
  'aria-hidden': ariaHidden,
  role,
  ...props
}: SignatureBaseProps & { children: React.ReactNode }) {
  const opticalSize = size <= 16 ? 'small' : size <= 20 ? 'medium' : 'base'
  const resolvedStrokeWidth = strokeWidth ?? (opticalSize === 'small' ? 2.2 : opticalSize === 'medium' ? 2.05 : 1.9)

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={resolvedStrokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={ariaLabel}
      aria-hidden={ariaHidden ?? (ariaLabel ? undefined : true)}
      role={role ?? (ariaLabel ? 'img' : undefined)}
      focusable="false"
      data-optical-size={opticalSize}
      {...props}
    >
      {children}
    </svg>
  )
}

export function MissionIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="M5 20V5.5c3-1.8 5.2 1.7 8.2-.1 1.7-1 3.2-.6 4.8.2l-1.8 4.1c-2.2-1-3.7-.8-5 .1-2.2 1.4-4.1-.5-6.2.2" />
      <path d="M3.5 20h4" />
      <circle cx="9.2" cy="7.4" r="1.15" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}

export function LifePowerIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="M7.2 6.3a7.4 7.4 0 1 0 9.6 0" />
      <path d="M12 3.5v17" />
      <path d="M8.8 14.6c1.9 1.2 4.5 1.2 6.4 0" />
      <circle cx="12" cy="5.3" r="1.3" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}

export function CiaIntelligenceIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="M12 3.2c1.2 4.3 4.5 7.6 8.8 8.8-4.3 1.2-7.6 4.5-8.8 8.8-1.2-4.3-4.5-7.6-8.8-8.8 4.3-1.2 7.6-4.5 8.8-8.8Z" />
      <path d="M12 8.8v6.4M8.8 12h6.4" />
      <circle cx="12" cy="12" r="1.4" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}

export function CorrelationIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="M13.2 7.4a5.2 5.2 0 1 0 0 9.2" />
      <path d="M10.8 7.4a5.2 5.2 0 1 1 0 9.2" />
      <circle cx="12" cy="12" r="1.35" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}

export function ProgressionIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="M3.5 19.5h17" />
      <path d="M4.5 18v-3.5h4V11h4V7.5h4V4" />
      <path d="m14.5 4 2-2 2 2" />
      <circle cx="12.5" cy="11" r="1.1" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}

export function DomainIcon({ active = false, ...props }: SignatureIconProps) {
  return (
    <SignatureIcon {...props}>
      <path d="m12 2.8 5.4 1.8 3.3 4.6-.2 5.7-3.6 4.4-5.5 1.6-5.3-2-2.9-4.8.5-5.7 3.8-4.2" />
      <circle cx="18.4" cy="14.9" r="1.35" fill={active ? 'currentColor' : 'none'} stroke="currentColor" />
    </SignatureIcon>
  )
}
