import React from 'react';

import './LinkButton.scss';

export type LinkButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
};

export default function LinkButton({ children, type }: LinkButtonProps) {
  return (
    <button className="link-button" type={type ?? 'button'}>
      {children}
    </button>
  );
}
