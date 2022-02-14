import React, { useState } from 'react';

const sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  return (
    <div>
      <div className="wrapper">
        <nav className={'sidebar ' + (sidebarOpen ? 'active' : '')}>
          <div className="dismiss">
            <i role="button" onClick={openSidebar} className="fas fa-arrow-left"></i>
          </div>
          <div className="logo">
            <h3>
              <a href="index.html">GS</a>
            </h3>
          </div>
          <ul className="list-unstyled menu-elements">
            <li className="active">
              <a className="scroll-link" href="#top-content">
                <i className="fas fa-home"></i> Home
              </a>
            </li>
            <li>
              <a className="scroll-link" href="#section-1">
                <i className="fas fa-cog"></i> What we do
              </a>
            </li>
            <li>
              <a className="scroll-link" href="#section-2">
                <i className="fas fa-user"></i> About us
              </a>
            </li>
            <li>
              <a className="scroll-link" href="#section-5">
                <i className="fas fa-pencil-alt"></i> Portfolio
              </a>
            </li>
            <li>
              <a className="scroll-link" href="#section-6">
                <i className="fas fa-envelope"></i> Contact us
              </a>
            </li>
            <li>
              <a
                href="#otherSections"
                data-toggle="collapse"
                aria-expanded="false"
                className="dropdown-toggle"
                role="button"
                aria-controls="otherSections"
              >
                <i className="fas fa-sync"></i>Other sections
              </a>
              <ul className="collapse list-unstyled" id="otherSections">
                <li>
                  <a className="scroll-link" href="#section-3">
                    Our projects
                  </a>
                </li>
                <li>
                  <a className="scroll-link" href="#section-4">
                    We think that...
                  </a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="to-top">
            <a className="btn btn-primary btn-customized-3" href="#" role="button">
              <i className="fas fa-arrow-up"></i> Top
            </a>
          </div>

          <div className="dark-light-buttons">
            <a className="btn btn-primary btn-customized-4 btn-customized-dark" href="#" role="button">
              Dark
            </a>
            <a className="btn btn-primary btn-customized-4 btn-customized-light" href="#" role="button">
              Light
            </a>
          </div>
        </nav>

        <div className="overlay"></div>

        <div className="content">
          <a className="btn btn-primary btn-customized open-menu" onClick={openSidebar} role="button">
            <i className="fas fa-align-left"></i> <span>Menu</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default sidebar;
