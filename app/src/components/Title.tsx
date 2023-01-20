import React, { useEffect } from 'react';

export type TitleProps = {
  prefix?: string;
  children: string;
};

export default function Title({ prefix, children }: TitleProps) {
  useEffect(() => {
    document.title = `${children} | ${prefix || 'Mất đồ'}`;
  }, [children, prefix]);

  return <h2>{children}</h2>;
}
