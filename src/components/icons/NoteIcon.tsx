import React from 'react';

export const NoteIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 11h4" />
      <path d="M12 15h4" />
      <rect width="14" height="18" x="5" y="3" rx="2" />
      <path d="M8 7v.01" />
      <path d="M8 11v.01" />
      <path d="M8 15v.01" />
    </svg>
  );
};

export default NoteIcon;
