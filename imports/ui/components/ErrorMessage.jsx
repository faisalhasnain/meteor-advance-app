import React from 'react';

export default ({ error }) => (
  <article className="message is-danger">
    <div className="message-body">
      {error}
    </div>
  </article>
);
