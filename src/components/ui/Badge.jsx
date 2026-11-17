import React from 'react';
import { CheckCircle2, AlertTriangle, Sparkles, Flame } from 'lucide-react';

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = ''
}) {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
    lg: 'text-sm px-3 py-1.5 gap-2'
  };

  const variantStyles = {
    default: 'bg-prison-800 text-slate-300 border border-prison-700',
    verified: 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 shadow-sm',
    gold: 'bg-prison-gold/15 text-prison-gold border border-prison-gold/40 shadow-sm',
    orange: 'bg-prison-orange/15 text-prison-orange-light border border-prison-orange/40',
    red: 'bg-prison-red/15 text-prison-red-light border border-prison-red/40',
    hazard: 'bg-yellow-950/70 text-yellow-300 border border-yellow-500/50',
  };

  let DefaultIcon = null;
  if (variant === 'verified') DefaultIcon = CheckCircle2;
  if (variant === 'hazard') DefaultIcon = AlertTriangle;
  if (variant === 'gold') DefaultIcon = Sparkles;
  if (variant === 'red') DefaultIcon = Flame;

  const ActiveIcon = icon || DefaultIcon;

  return (
    <span className={`inline-flex items-center font-semibold rounded uppercase tracking-wider ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {ActiveIcon && <ActiveIcon className="w-3.5 h-3.5 shrink-0" />}
      <span>{children}</span>
    </span>
  );
}
