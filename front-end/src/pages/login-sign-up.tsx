import Login_page from "./login";
import Sign_up_Page from "./sign_up";
import Header from "../components/header";

const Login_sign_up = () => {
  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-orange-100">
          <Login_page></Login_page>
        </div>
        <div className="bg-blue-200">
          <Sign_up_Page></Sign_up_Page>
        </div>
      </div>
    </>
  );
};

export default Login_sign_up;
