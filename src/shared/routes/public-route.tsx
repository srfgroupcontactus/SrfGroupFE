import { Navigate } from "react-router-dom";
import { ALL_APP_ROUTES } from "../../core/config/all-app-routes";
import React from "react";

/**
 * Only if LogedOut
 * @param {any} children
 * @param {boolean} isAuthenticated
 * @param {{}} rest
 * @returns {any}
 * @constructor
 */
export function PublicRoute({
  children,
  isAuthenticated,
  path,
  ...rest
}: {
  children: any;
  isAuthenticated: boolean;
  path: string;
}) {
  return isAuthenticated ? (
    <Navigate to={ALL_APP_ROUTES.HOME} replace />
  ) : (
    children
  );
  // <Route
  //     path={path}
  //     render={({ location }) => {
  //         return isAuthenticated === false ? (
  //             children
  //         ) : (
  //             <Redirect
  //                 to={{
  //                     pathname: ALL_APP_ROUTES.HOME,
  //                     state: { from: location },
  //                 }}
  //             />
  //         );
  //     }}
  // />
}
