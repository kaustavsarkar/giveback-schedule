import Header from 'modules/header/header';
import React from 'react';
import {Link, Outlet} from 'react-router-dom';
import {useAppSelector} from 'state/hooks';
import {RootState} from 'state/store';
import './home.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function NavButton(props: {text: string; path: string}): JSX.Element {
  return (
    <>
      <Link to={props.path} className="login-button">
        <div>{props.text}</div>
      </Link>
    </>
  );
}

/**
 *
 * @return {JSX.Element}
 */
function Home(): JSX.Element {
  const user = useAppSelector((state: RootState) => state.userProfile.user);
  return (
    <>
      <Header user={user} />
      <div className="home-content">
        <div className="home-slider">
          <NavButton
            text={user ? 'Schedule' : 'Login'}
            path={user ? `/schedules` : '/login'}
          />
        </div>
        <div className="home-about container" id="about-us">
          <h3>About Us</h3>
          <p>
            The #Giveback initiative is to help people trying to prepare for
            interviews. It is normal for a candidate to feel butterflies before
            the interviews, we would try to provide you mock interviews so that
            you feel more comfortable in the real game.
          </p>
          <h4>Mission</h4>
          <p>
            Provide candidates with close to actual interview experience and
            help them track their progress.
          </p>
          <h4>Benefits</h4>
          <div className="home-about-benefit">
            <div>Interviews resemble the real-life interviews</div>
            <div>Get your doubts clarified</div>
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
                    <a
                      href="https://www.linkedin.com/in/kaustav-sarkar-84202a61/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                  <div className="link">
                    <a
                      href="https://github.com/kaustavsarkar"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                  <div className="link">
                    <a
                      href="mailto:referrals.kaustav@gmail.com"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <i className="fas fa-envelope"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="home-footer">
        <span className="col">
          <h3 className="col-title">All rights reserved #giveback</h3>
        </span>
      </div>
      <Outlet />
    </>
  );
}
export default Home;
