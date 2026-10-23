import React from 'react';

type Props = {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
  showTagline?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Official logo symbol + separate wordmark */
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
  const box = size === 'sm' ? 'w-8 h-8' : 'w-10 h-10';
  const title = size === 'sm' ? 'text-[0.95rem]' : 'text-[1.05rem]';

  return (
    <div
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <img
        src="/logo-symbol.png"
        alt="DrRehab@Home"
        className={`${box} rounded-lg object-contain shrink-0`}
        width={size === 'sm' ? 32 : 40}
        height={size === 'sm' ? 32 : 40}
      />
      <div className="leading-tight">
        <div className={`${title} font-bold tracking-tight ${titleColor}`}>
          DrRehab<span className={atColor}>@</span>Home
        </div>
        {showTagline && (
          <p className={`text-[10px] font-medium ${tagColor} tracking-wide`}>
            Stage-based home rehab · Bengaluru
          </p>
        )}
      </div>
    </div>
  );
};
