import React from 'react';

export default ({ message }) => {
  const loading = 'Loading ...';
  return (
    <div className="section has-text-centered">
      <i className="fa fa-circle-o-notch fa-spin" /> { message || loading }
    </div>
  );
};
