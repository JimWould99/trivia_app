import { Link } from "react-router-dom";
import Login_page from "./login";
const Join_option = () => {
  return (
    <>
      <div className="grid grid-rows-[1fr_1fr] sm:grid-rows-[1fr_1fr]  md:grid-rows-[1fr] lg:grid-rows-[1fr] sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 h-[100vh]">
        <div className="bg-blue-200 ">
          <Login_page join_game={true}></Login_page>
        </div>
        <div className="bg-orange-100 h-full w-full flex justify-center">
          <Link to={"/join_game"}>
            <div className="text-4xl font-bold mt-12 h-20 text-white px-16 py-4 bg-cyan-800 drop-shadow-xl rounded cursor-pointer hover:bg-cyan-300 hover:text-black">
              Guest Account
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Join_option;
