import React from 'react';

import './loading-indicator.scss';

export default function LoadingIndicator() {
  return (
    <>
      <div className="loading-indicator-backgound">
        <div className="loading-points point-one"></div>
        <div className="loading-points point-two"></div>
        <div className="loading-points point-three"></div>
      </div>
    </>
  );
}
