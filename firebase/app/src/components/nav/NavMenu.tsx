import React from 'react';

import './NavMenu.scss';

export type NavMenuProps = {
  children: React.ReactElement[];
};

export default function NavMenu(props: NavMenuProps) {
  return (
    <nav className="nav-menu">
      <ul>
        {props.children?.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    </nav>
  );
}
