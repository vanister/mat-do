import React, { useEffect } from 'react';

export type TitleProps = {
  suffix?: string;
  children: string;
};

export default function Title({ suffix, children }: TitleProps) {
  useEffect(() => {
    document.title = `${children} | ${suffix || 'Mất đồ'}`;
  }, [children, suffix]);

  return <h2>{children}</h2>;
}
