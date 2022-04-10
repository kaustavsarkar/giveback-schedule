import React, {useEffect} from 'react';
import './login.scss';
import './login-card';
import LoginCard from './login-card';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import {UserProfile} from 'models/user';
import {useNavigate} from 'react-router-dom';

/**
 *
 * @return {JSX.Element}
 */
export default function Login(): JSX.Element {
  const existingUser = useAppSelector(
    (state: RootState) => state.userPofile,
  ) as UserProfile;

  const navigate = useNavigate();

  useEffect(() => {
    console.log('is user saved in firebase', existingUser?.user?.hasLoggedIn);
    if (existingUser?.user?.hasLoggedIn) {
      navigate('/profile', {replace: true});
    }
    console.log('login component', existingUser);
  });

  return (
    <div className="login-container">
      <LoginCard />
    </div>
  );
}
