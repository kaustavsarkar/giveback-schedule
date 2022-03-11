import React from 'react';
import {Navigate, Outlet} from 'react-router-dom';

/**
 * Acts as an HOC for Route from `react-router-dom`. It shall handle all the private
 * routes, which shall require the user to stay logged in order to access the pages.
 *
 * The component shall need to know where the
 *
 * @param {string} redirectTo path to redirect the user in case user is not logged in.
 * @returns {JSX.Element}
 */
export const PrivateRoute = ({
  redirectTo,
}: {
  redirectTo: string;
}): JSX.Element => {
  const isLoggedIn = false;
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace></Navigate>;
  }
  return <Outlet />;
};
