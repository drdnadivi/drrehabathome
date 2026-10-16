import React from 'react';
import { Stethoscope } from 'lucide-react';

type Props = {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md';
  showTagline?: boolean;
  onClick?: () => void;
  className?: string;
};

/** Symbol and wordmark are separate elements (NMC-safe brand mark — no RMP photo). */
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
  const box = size === 'sm' ? 'w-8 h-8 rounded-lg' : 'w-10 h-10 rounded-xl';
  const title = size === 'sm' ? 'text-[0.95rem]' : 'text-[1.05rem]';

  return (
    <div
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer group' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      {/* Symbol only */}
      <div
        className={`${box} bg-gradient-to-br from-teal-700 to-teal-500 flex items-center justify-center text-white shadow-sm shadow-teal-600/25 relative shrink-0`}
        aria-hidden
      >
        <Stethoscope className={size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} />
        <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white text-teal-700 text-[8px] font-black flex items-center justify-center border border-teal-100">
          @
        </span>
      </div>
      {/* Text separate */}
      <div className="leading-tight">
        <div className={`${title} font-bold tracking-tight ${titleColor}`}>
          DrRehab<span className={atColor}>@</span>Home
        </div>
        {showTagline && (
          <p className={`text-[10px] font-medium ${tagColor} tracking-wide`}>
            Guided home rehab · Bengaluru
          </p>
        )}
      </div>
    </div>
  );
};
