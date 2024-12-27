import { useContext, useState } from "react";
import { AuthContext } from "../context/auth_context";
import Header from "../components/header";
import { Link, useNavigate } from "react-router-dom";

const Login_page = ({ redirect, join_game }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [error, setError] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);
  const { user, login, logout } = useContext(AuthContext);

  const [showPass, setShowPass] = useState<string>("password");

  const navigate = useNavigate();

  const login_request = async () => {
    setLoading(true);
    setError(null);

    const request_details = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    };
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_URL}/users/login_user`,
      request_details
    );

    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      login(json);
      setLoading(false);
      if (redirect) {
        navigate("/create_quiz");
      } else if (join_game) {
        navigate("/join_game");
      } else {
        navigate("/");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    login_request();
  };

  const handleButtonSubmit = async () => {
    login_request();
  };

  const eyeClick = async () => {
    if (showPass === "password") {
      setShowPass("text");
    } else {
      setShowPass("password");
    }
  };
  return (
    <>
      <div className="flex justify-center">
        <div className="sm:w-2/3 md:w-2/3 lg:w-2/3 bg-white px-10 mt-4 sm:mt-10 md:mt-10 lg:mt-10 rounded-md shadow-md">
          <p className="mt-5 text-2xl">Login </p>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex flex-col gap-7 "
          >
            <div className=""></div>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              id="email"
              className="rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-none border border-black h-10 pl-4"
              placeholder="email"
            />
            <div className="flex gap-4 items-center">
              <input
                type={showPass}
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                id="password"
                className="rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none focus:border-none border border-black h-10 pl-4 w-full"
                placeholder="password"
              />
              {showPass === "password" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 hover:cursor-pointer"
                  onClick={() => eyeClick()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              )}
              {showPass === "text" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-8 hover:cursor-pointer"
                  onClick={() => eyeClick()}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              )}
            </div>
            <button className="bg-white hover:bg-blue-900 hover:text-white text-black py-2 px-4 rounded text-nowrap border-2 border-black hover:border-white w-1/2 text-lg">
              Login
            </button>
            <p className="text-lg text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login_page;
