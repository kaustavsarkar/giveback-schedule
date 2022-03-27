import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from 'modules/home/home';
import Login from 'modules/login/login';
import {PrivateRoute} from 'private_route';
import UserProfile from 'modules/profile/profile';

/**
 *
 * @return {JSX.Element}
 */
function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute redirectTo="/login" />}>
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/dashboard" element={<></>}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
