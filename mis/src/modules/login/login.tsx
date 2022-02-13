import React from 'react';
import './login.scss';
import './login-card';
import LoginCard from './login-card';

/**
 *
 * @return {JSX.Element}
 */
export default function Login(): JSX.Element {
  return (
    <div className="login-container">
      <LoginCard />
    </div>
  );
}
