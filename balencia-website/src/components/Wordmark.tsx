/**
 * Brand wordmark. The brand period is sacred — always present, always orange.
 * NOTE: PoC typesets "Balencia." in Sora as a placeholder. Production should use
 * the official asset (Balencia/Balencia-Creatives-Reference/logos/) — the canonical
 * wordmark font is Monda. Never regenerate the logo.
 */
export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "text-[18px]",
    md: "text-[22px]",
    lg: "text-[clamp(28px,3vw,44px)]",
  } as const;
  return (
    <span
      className={`font-bold tracking-[-0.02em] text-paper-100 ${sizes[size]} ${className}`}
      aria-label="Balencia"
    >
      Balencia<span className="text-brand-orange">.</span>
    </span>
  );
}
