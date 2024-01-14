import './Thankyou.scss';

import React from 'react';
import Title from '../../components/Title';

export default function Thankyou() {
  return (
    <section className="thankyou-page">
      <Title>Thank you</Title>
      <p>Thank you for notifying the person that lost their item! 🤗</p>
    </section>
  );
}
