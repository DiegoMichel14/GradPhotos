interface HeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
}

export default function Header({ eyebrow, title, subtitle }: HeaderProps) {
  return (
    <header className="flex flex-col items-center text-center gap-2 pt-10 pb-6 px-6">
      <span className="font-mono text-[11px] tracking-[0.25em] uppercase text-[#B8975A]">
        {eyebrow}
      </span>
      <h1 className="font-display text-3xl sm:text-4xl text-[#F5F6F8] leading-tight">
        {title}
      </h1>
      {subtitle && (
        <p className="text-[#C7CDD6] text-sm max-w-xs">{subtitle}</p>
      )}
      <div className="mt-3 h-px w-16 bg-gradient-to-r from-transparent via-[#B8975A] to-transparent" />
    </header>
  );
}