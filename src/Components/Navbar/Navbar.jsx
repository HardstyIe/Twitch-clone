import React from 'react';
import { useTwitchAuth } from '../../Hooks/useTwitchAuth';
import point from "../../assets/icons8-points-de-suspension-30.png";
import logo from "../../assets/icons8-twitch-48.png";
import "./NavbarStyle.css";

const Navbar = () => {
  const { authToken, redirectToTwitchAuth, appAccessToken, authUser } = useTwitchAuth();
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between w-full h-12 bg-black navbar">
      <div className="flex items-center justify-between gap-5 logo">
        <img src={logo} alt="Twitch logo" />
        <a href="">Suivis</a>
        <a href="">Parcourir</a>
        <img src={point} alt="" className="w-4 h-5" />
      </div>
      <form className="w-4/6">
        <div className="relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search"
            className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
          />
        </div>
      </form>
      <div className="links">
        <button onClick={redirectToTwitchAuth}>Login</button>
        <a href="#">Sign up</a>
      </div>
    </div>
  );
};

export default Navbar;
