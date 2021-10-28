import React, { useState } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
const Nav = () => {
  const [toggleNav, setToggleNav] = useState(false);
  const [toggleLogout, setToggleLogout] = useState(false);
  let history = useHistory();
  const { user, logout } = useAuth();
  const handleLogin = () => {
    history.push("/signin");
  };
  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
            <button
              onClick={() => setToggleNav(!toggleNav)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md bg-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <img src="https://img.icons8.com/material-outlined/24/000000/menu--v1.png" />
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center lg:items-stretch lg:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/">
                <h1 className="text-3xl text-white">Volunteer Network</h1>
              </Link>
            </div>
            <div className="hidden lg:block lg:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  exact
                  to="/"
                  className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </NavLink>

                <NavLink
                  to="/donate"
                  className=" text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Donate
                </NavLink>

                <NavLink
                  to="/myEvents"
                  className="text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-gray-900 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  My Events
                </NavLink>
                <NavLink
                  to="/admin"
                  className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  activeClassName="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium"
                  aria-current="page"
                >
                  Admin
                </NavLink>
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 relative">
              <div>
                {user ? (
                  <button
                    onClick={() => setToggleLogout(!toggleLogout)}
                    type="button"
                    className="bg-gray-800 flex justify-center items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span className="text-white mr-2 text-xl hidden sm:block">
                      {user?.displayName}
                    </span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user?.photoURL}
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    onClick={handleLogin}
                    className="px-5 rounded text-white font-bold py-2 bg-indigo-500"
                  >
                    Login
                  </button>
                )}
              </div>

              {user ? (
                <div
                  className={`origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    toggleLogout ? "block" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabIndex="-1"
                >
                  <button
                    onClick={logout}
                    className="block w-full px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabIndex="-1"
                    id="user-menu-item-0"
                  >
                    Log out
                  </button>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${toggleNav ? "block" : "hidden "}` + "lg:hidden"}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            exact
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Home
          </NavLink>

          <NavLink
            to="/donation"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Donation
          </NavLink>

          <NavLink
            to="myEvents"
            className="text-white block px-3 py-2 rounded-md text-base font-medium"
            activeClassName="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            My Events
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
