import React, {useEffect} from 'react';
import './login.scss';
import './login-card';
import LoginCard from './login-card';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import {UserProfile} from 'models/user';

/**
 *
 * @return {JSX.Element}
 */
export default function Login(): JSX.Element {
  const existingUser = useAppSelector(
    (state: RootState) => state.user,
  ) as UserProfile;
  useEffect(() => {
    // if(existingUser.user.hasLoggedIn) {
    // }
    console.log('login component', existingUser);
  });

  return (
    <div className="login-container">
      <LoginCard />
    </div>
  );
}
