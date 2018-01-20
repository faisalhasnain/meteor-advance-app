import React from 'react';
import 'bulma/css/bulma.css';

import './GuestLayout.css';

export default props => (
  <section className="section">
    <div className="fluid-container guest-container">
      <h1 className="subtitle is-3 has-text-primary">Meteor Basic App</h1>
      <div className="space-block" />
      <div className="box">
        {props.page}
      </div>
    </div>
  </section>
);
