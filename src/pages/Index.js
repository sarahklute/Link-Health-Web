import React from 'react';
import { Link } from 'react-router-dom';

import Main from '../layouts/Main';

const Index = () => (
  <Main
    description={
      "Michael D'Angelo's personal website. New York based Stanford ICME graduate, "
      + 'VP of Engineering at Smile Identity, co-founder of Arthena and Matroid, and YC Alumni.'
    }
  >
    <article className="post" id="index">
      <header>
        <div className="title">
          <h2>
            <Link to="/">About this Project</Link>
          </h2>
          <p>
            A website created by Rishabh and Sarah to simplify the Link Health intake process.
          </p>
          <label htmlFor="name">
            Name:
            <input type="text" id="name" />
          </label>
        </div>
      </header>
    </article>
  </Main>
);

export default Index;
