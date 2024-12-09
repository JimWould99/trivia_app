import { Link } from "react-router-dom";
import Login_sign_up from "./login-sign-up";
const Initial = () => {
  return (
    <>
      <div
        className="rounded-full px-8 py-3 bg-blue-900 flex items-center justify-center gap-6"
        style={{ position: "absolute", left: "20px", top: "20px" }}
      >
        <Link to="/sign_up_login">
          <button
            className="text-md text-white font-bold bg-orange-800 rounded p-2.5 hover:bg-orange-300 hover:text-black"
            style={{
              boxShadow: "inset 0px -4px 0px 0px rgba(0, 0, 0, 0.25)",
            }}
          >
            Login / Sign-up
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-2 h-[100vh]">
        <div className="bg-blue-200 h-full w-full flex justify-center items-center">
          <Link to="/account_page">
            <div className="text-4xl font-bold text-white px-16 py-4 bg-cyan-800 drop-shadow-xl rounded cursor-pointer hover:bg-cyan-300 hover:text-black">
              Create Quiz
            </div>
          </Link>
        </div>
        <div className="bg-orange-100 h-full w-full flex justify-center items-center">
          <Link to="/join_option">
            <div className="text-4xl font-bold text-white px-16 py-4 bg-fuchsia-800 drop-shadow-xl rounded cursor-pointer hover:bg-fuchsia-300 hover:text-black">
              Join Quiz
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Initial;
