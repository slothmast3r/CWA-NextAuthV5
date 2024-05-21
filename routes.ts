/*
    an array of routes that are used for public access
    */

export const publicRoutes = ["/", "/auth/new-verification"];

/*
 an array of routes that are used for authentication
*/

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

/**
 *  the prefix for the api routes
 * routes that start with this prefix are considered api routes
 */

export const apiAuthPrefix = "/api/auth";

/**
 * the default redirect path after login
 * @type {string}
 */

export const DEFAULT_LOGIN_REDIRECT = "/settings";
