import React from 'react';
import { Link } from 'react-router-dom';

export default function Button({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  disabled = false,
  type = 'button',
  ...props
}) {
  const baseStyles = "inline-flex items-center justify-center font-semibold uppercase tracking-wider transition-all duration-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-prison-950 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";
  
  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-5 py-2.5 gap-2",
    lg: "text-base px-7 py-3.5 gap-2.5",
    xl: "text-lg px-8 py-4 gap-3",
  };

  const variantStyles = {
    primary: "bg-prison-gold hover:bg-prison-gold-light text-prison-950 shadow-glow-gold hover:shadow-lg focus:ring-prison-gold font-bold active:scale-[0.98]",
    secondary: "bg-prison-850 hover:bg-prison-800 text-white border border-prison-700 hover:border-prison-gold/50 focus:ring-prison-gold active:scale-[0.98]",
    outline: "bg-transparent hover:bg-prison-gold/10 text-prison-gold border-2 border-prison-gold hover:border-prison-gold-light focus:ring-prison-gold active:scale-[0.98]",
    orange: "bg-prison-orange hover:bg-prison-orange-light text-white shadow-glow-orange focus:ring-prison-orange font-bold active:scale-[0.98]",
    danger: "bg-prison-red hover:bg-prison-red-light text-white focus:ring-prison-red font-bold active:scale-[0.98]",
    ghost: "bg-transparent hover:bg-white/5 text-slate-300 hover:text-white focus:ring-slate-500",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className={size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses} {...props}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} {...props}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      {...props}
    >
      {content}
    </button>
  );
}
