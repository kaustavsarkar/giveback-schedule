import React from 'react';
import './login-card.scss';
import {ReactComponent as GoogleSvg} from './assets/icons8-google.svg';
import {googleSignIn} from 'modules/auth/google_auth';

export default function LoginCard() {
  return (
    <div className="login-card-container">
      <div className="content-center height-100">
        <div className="content-container">
          <span>
            Welcome to <code>#giveback</code>
          </span>
          <ul className="login-icons">
            <div className="login-svg">
              <GoogleSvg></GoogleSvg>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
