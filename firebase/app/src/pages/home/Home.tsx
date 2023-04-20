import React from 'react';
import Title from '../../components/Title';

import './Home.scss';

export default function Home() {
  return (
    <div className="home-page">
      <Title>Home</Title>
      <p>
        Generate QR Codes with a name and description and tag it to an item you
        want to track using crowd sourcing.
      </p>
      <p>
        This low-tech solution depends on kind people who will scan and report
        where your lost items are found ❤️.
      </p>
      <footer>
        <p>
          <em>
            <strong>DISCLAIMER:</strong>
          </em>{' '}
          This is a demo, proof-of-concept, product. Please use at your own risk
          as no guarantees are made about the integrity of the system.
        </p>
      </footer>
    </div>
  );
}
