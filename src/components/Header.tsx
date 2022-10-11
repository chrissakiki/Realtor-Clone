import React from "react";
import Logo from "../assets/images/logo.svg";
import { useLocation, useNavigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
const Header = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { loggedIn, loading } = useAuthStatus();

  const pathMatchRoute = (route: string) => {
    if (route === pathname) {
      return true;
    }
    return false;
  };

  if (loading) {
    return <></>;
  }
  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex-bc px-3 max-w-6xl mx-auto">
        <div>
          <img
            src={Logo}
            alt="Realtor logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className={`nav-link ${pathMatchRoute("/") && "nav-active"}`}
              onClick={() => navigate("/")}
            >
              Home
            </li>
            <li
              className={`nav-link ${
                pathMatchRoute("/offers") && "nav-active"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>
            {!loggedIn && (
              <li
                className={`nav-link ${
                  pathMatchRoute("/sign-in") && "nav-active"
                }`}
                onClick={() => navigate("/sign-in")}
              >
                Sign in
              </li>
            )}
            {loggedIn && (
              <li
                className={`nav-link ${
                  pathMatchRoute("/profile") && "nav-active"
                }`}
                onClick={() => navigate("/profile")}
              >
                Profile
              </li>
            )}
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;
