import Image from 'next/image'

type BrandWordmarkProps = {
  width?: number
  className?: string
}

export function BrandWordmark({ width = 128, className = '' }: BrandWordmarkProps) {
  return (
    <Image
      src="/logos/Frame%202147239943.svg"
      alt="Balencia."
      width={width}
      height={Math.round(width / 4)}
      className={['block h-auto', className].filter(Boolean).join(' ')}
      priority
    />
  )
}
