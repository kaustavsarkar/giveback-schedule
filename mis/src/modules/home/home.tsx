import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import './home.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LoginButton: React.FC = () => {
  return (
    <>
      <Link to={`/login`} className="login-button">
        <div>Login</div>
      </Link>
    </>
  );
};

/**
 *
 * @return {JSX.Element}
 */
function Home(): JSX.Element {
  return (
    <>
      <div className="home-navbar">
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="#">
            Giveback Schedule
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

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
        </nav>
      </div>
      <div className="home-content">
        <div className="home-slider">
          <LoginButton />
        </div>
        <div className="home-about container" id="about-us">
          <h3>About Us</h3>
          <p>
            Rupal & Rupal was established with an intent to provide an
            all-inclusive setup for serving clients across international
            borders. With a team of competent, qualified and experienced
            lawyers, we aim to achieve the highest technical standards whilst
            conforming to ethical legal practices. Rupal & Rupal offers legal
            advisory, guidance and representation on a wide spectrum of issues
            ensuring client satisfaction.
          </p>
          <h4>Mission</h4>
          <p>
            At Rupal & Rupal, we are committed to providing our Clients the best
            legal services at reasonable costs in all spheres of law.Our motto
            is. The spirit behind this boutique law firm is the enriched
            experience of its partners and associates in handling with dexterity
            and aplomb all matters . The Clients have the best advantage of
            receiving a professional approach coupled with integrity and timely
            execution.
          </p>
          <h4>Benefits</h4>
          <div className="home-about-benefit">
            <div>Boost your confidence and reduce interview stress</div>
            <div>Constructive feedback in a low-stress environment</div>
          </div>
          <div className="home-about-benefit">
            <div>Boost your confidence and reduce interview stress</div>
            <div>Constructive feedback in a low-stress environment</div>
          </div>
        </div>
        <div className="home-testinomial container"></div>
        <div className="home-contact container" id="contact-us">
          <h3>Contact Us</h3>
          <section id="contact">
            <div className="contact-box">
              <div className="contact-links">
                <h2>CONTACT</h2>
                <div className="links">
                  <div className="link">
                    <a>
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                  <div className="link">
                    <a>
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                  <div className="link">
                    <a>
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-form-wrapper">
                <form>
                  <div className="form-item">
                    <input type="text" name="sender" required />
                    <label>Name:</label>
                  </div>
                  <div className="form-item">
                    <input type="text" name="email" required />
                    <label>Email:</label>
                  </div>
                  <div className="form-item">
                    <textarea className="" name="message" required></textarea>
                    <label>Message:</label>
                  </div>
                  <button className="submit-btn">Send</button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="home-footer">
        <span className="col">
          <h3 className="col-title">All rights reserved @giveback Schedule</h3>
        </span>

        <span className="col">
          <div className="subscribe-form-holder">
            <h3 className="form-title">Subscribe to our email newsletter</h3>
            <form action="#" className="subscribe-form">
              <input
                type="email"
                name="email"
                id="email"
                className="email subscribe-input"
                autoComplete="off"
                placeholder="Your email"
              />
              <button type="submit" className="subscribe-btn">
                Subscribe
              </button>
            </form>
          </div>
        </span>
      </div>
      <Outlet />
    </>
  );
}
export default Home;
