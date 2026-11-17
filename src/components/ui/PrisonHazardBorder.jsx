import React from 'react';

export default function PrisonHazardBorder({ height = 'h-2', className = '' }) {
  return (
    <div
      className={`w-full ${height} hazard-stripe-bar shadow-sm ${className}`}
      aria-hidden="true"
    />
  );
}
