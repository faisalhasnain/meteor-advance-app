import React from 'react';
import './GuestLayout.css';

export default props => (
  <section className="section">
    <div className="fluid-container guest-container">
      <div className="app-title">
        <img src="/logo.png" alt="WebDrvn" width="112" height="28" />
        &nbsp;&nbsp;
        <h1 className="subtitle is-3 has-text-primary">Snap</h1>
      </div>
      <div className="space-block" />
      <div className="box">
        {props.page}
      </div>
    </div>
  </section>
);
