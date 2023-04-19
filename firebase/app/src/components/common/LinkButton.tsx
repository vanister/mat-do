import React from 'react';

import './LinkButton.scss';

export type LinkButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;

  onClick?: (event: React.MouseEvent) => void;
};

/**
 * A button styled to look like an anchor tag.
 */
export default function LinkButton({
  children,
  type,
  onClick
}: LinkButtonProps) {
  return (
    <button className="link-button" type={type ?? 'button'} onClick={onClick}>
      {children}
    </button>
  );
}
