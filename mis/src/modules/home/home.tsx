import React from 'react';
import { Link } from 'react-router-dom';

const LoginButton: React.FC = () => {
  return (
    <Link to={`/login`}>
      <div>Login</div>
    </Link>
  );
};

function Home() {
  return (
    <>
      <div>kuch dikha bhai</div>
      <LoginButton />
    </>
  );
}
export default Home;
