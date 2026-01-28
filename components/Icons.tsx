import React from 'react';

export const PCIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

export const SwitchIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="1" />
    <path d="M7 12h.01M12 12h.01M17 12h.01" />
    <path d="M4 12l2-2m0 4l-2-2" />
    <path d="M20 12l-2-2m0 4l2-2" />
  </svg>
);

export const RouterIcon = ({ color }: { color: string }) => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3v18M3 12h18" />
    <path d="m16 8-4-4-4 4" />
    <path d="m8 16 4 4 4-4" />
    <path d="m16 16 4-4-4-4" />
    <path d="m8 8-4 4 4 4" />
  </svg>
);