import {User} from 'models/user';
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import ProfilePhoto from 'shared/profile-photo/profile-photo';
import './header.scss';

function PublicNav_(): JSX.Element {
  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <a className="nav-link" href="#about-us">
            About us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact-us">
            Contact us
          </a>
        </li>
      </ul>
    </div>
  );
}

function PrivateNav_(): JSX.Element {
  return (
    <div id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item active">
          <Link className="nav-link" to="/schedules">
            Schedules
          </Link>
        </li>
      </ul>
    </div>
  );
}

function Header(props: {user: User}): JSX.Element {
  const [headerClass, setHeaderClass] = useState('header');
  const user = props.user;
  const isUserLoggedIn = user !== undefined && user !== null;
  const header = document.getElementById('header');
  const sticky = header?.offsetTop;
  window.onscroll = () => {
    if (sticky !== undefined && window.pageYOffset > sticky) {
      setHeaderClass('header sticky');
    } else {
      setHeaderClass('header');
    }
  };
  return (
    <div className={headerClass} id="header">
      <nav className="navbar navbar-expand-lg">
        <Link className="navbar-brand" to="/">
          #Giveback
        </Link>
        {isUserLoggedIn ? <PrivateNav_ /> : <PublicNav_ />}
        <div className="user-pic">
          {isUserLoggedIn && (
            <Link to={`/profile/${user.email}`}>
              <ProfilePhoto photoUrl={user.photoUrl} />
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Header;
