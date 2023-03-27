import React from 'react';
import Title from '../../components/Title';

import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <Title>Home</Title>
      <p>
        TODO: explain the benefits of creating a an account to generate qr codes
        to help track your things
      </p>
    </div>
  );
}
