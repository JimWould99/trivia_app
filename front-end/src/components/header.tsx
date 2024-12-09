import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth_context";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div className="h-20 flex justify-between items-center px-20 bg-orange-200 border-b-2 border-stone-400">
        {user ? (
          <Link to="/">
            <p className="text-3xl font-bold">Trivia site</p>
          </Link>
        ) : (
          <Link to="/sign_up_login">
            <button
              className="text-lg text-white font-bold bg-orange-800 rounded p-2.5 hover:bg-orange-300 hover:text-black"
              style={{
                boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
              }}
            >
              Login / Sign-up
            </button>
          </Link>
        )}
        {user && (
          <div className="flex gap-3">
            <Link to="/join_game">
              <button
                className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black"
                style={{
                  boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                Join game
              </button>
            </Link>
            <Link to="/create_quiz">
              <button
                className="text-md text-white font-bold bg-fuchsia-800 rounded p-2.5 hover:bg-white hover:text-black"
                style={{
                  boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
                }}
              >
                Create new deck
              </button>
            </Link>
            <button className="bg-blue-900 rounded-full p-2.5 hover:bg-blue-700 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
