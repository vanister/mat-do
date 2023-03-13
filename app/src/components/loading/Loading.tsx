import React from 'react';

import './Loading.scss';

export type LoadingProps = {
  text?: string;
}

export default function Loading(props: LoadingProps) {
  const text = props.text ?? 'Loading...';

  return <div className='loading-indicator'>{text}</div>;
}
