import React from 'react';

type Props = {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
  showTagline?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Inline SVG symbol + wordmark + tagline */
export const BrandLogo: React.FC<Props> = ({
  variant = 'light',
  size = 'md',
  showTagline = true,
  onClick,
  className = '',
}) => {
  const titleColor = variant === 'dark' ? 'text-white' : 'text-slate-900';
  const atColor = variant === 'dark' ? 'text-teal-300' : 'text-teal-600';
  const tagColor = variant === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const box = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  const title = size === 'sm' ? 'text-[0.95rem]' : 'text-[1.05rem]';
  const stroke = variant === 'dark' ? '#5eead4' : '#0E6E6E';
  const dot = variant === 'dark' ? '#5eead4' : '#3FBF8F';

  return (
    <div
      className={`flex items-center gap-2.5 shrink-0 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        className={`${box} shrink-0 rounded-lg`}
        role="img"
        aria-label="DrRehab@Home"
      >
        <g fill="none" stroke={stroke} strokeWidth="44" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 96,272 C 114,412 398,412 416,272" />
        </g>
        <g fill="none" stroke={stroke} strokeWidth="38" strokeLinecap="round" strokeLinejoin="round">
          <path d="M 170,232 L 256,152 L 342,232" />
          <path d="M 194,238 L 194,292" />
          <path d="M 318,238 L 318,292" />
        </g>
        <circle cx="256" cy="242" r="25" fill={dot} />
      </svg>
      <div className="leading-tight">
        <div className={`${title} font-bold tracking-tight ${titleColor} whitespace-nowrap`}>
          DrRehab<span className={atColor}>@</span>Home
        </div>
        {showTagline && (
          <p className={`text-[10px] sm:text-[11px] font-medium ${tagColor} tracking-wide whitespace-nowrap`}>
            Doctor-led rehab at home
          </p>
        )}
      </div>
    </div>
  );
};
