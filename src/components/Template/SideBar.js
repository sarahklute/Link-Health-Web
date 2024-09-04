import React from 'react';
import { Link } from 'react-router-dom';

import ContactIcons from '../Contact/ContactIcons';

const { PUBLIC_URL } = process.env; // set automatically from package.json:homepage

const SideBar = () => (
  <section id="sidebar">
    <section id="intro">
      <Link to="/" className="logo">
        <img src={`${PUBLIC_URL}/images/LinkHealthIcon.jpg`} alt="" />
      </Link>
      <header>
        <h2>Link Health Benefits Eligibility and Enroller Tool</h2>
        <p>
          <a href="https://link-health.org/">Explore the Link Health Website Here!</a>
        </p>
      </header>
    </section>

    <section id="footer">
      <ContactIcons />
    </section>
  </section>
);

export default SideBar;
