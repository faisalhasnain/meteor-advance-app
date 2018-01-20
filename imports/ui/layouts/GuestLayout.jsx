import React from 'react';
import './GuestLayout.css';

export default props => (
  <template name="guestLayout">
    <section className="section">
      <div className="container guest-container">
        <h1 className="title has-text-primary">Accounts Manager</h1>
        <div className="box">
          {props.page}
        </div>
      </div>
    </section>
  </template>
);
