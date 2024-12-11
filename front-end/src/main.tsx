import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContextProvider } from "./context/socket";
import { AuthContextProvider } from "./context/auth_context";

import Home from "./pages/home";
import Question_collection from "./pages/quiz_question";
import Create_game from "./pages/create_game";
import Enter_room from "./pages/enter_room";
import Quiz_live from "./pages/quiz_live";
import Quiz_client from "./pages/quiz_live_client";
import Response_display from "./components/response_display";
import Leaderboad_display from "./components/leaderboard";
import Leaderboard_display from "./components/leaderboard";
import Quiz_finish_online from "./pages/quiz_finish_multi";
import Initial from "./pages/initial";
import Create_quiz_page from "./pages/create_quiz";
import Join_option from "./pages/join_option";
import Create_questions from "./pages/create_questions";
import My_quizzes from "./pages/my_quizzes_page";

import Login_page from "./pages/login";
import Sign_up_Page from "./pages/sign_up";
import Account_page from "./pages/account_page";
import Login_sign_up from "./pages/login-sign-up";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/quiz",
    element: <Question_collection />,
  },
  {
    path: "/create_game",
    element: <Create_game />,
  },
  { path: "/join_game", element: <Enter_room /> },
  { path: "/quiz_live", element: <Quiz_live /> },
  { path: "/quiz_client", element: <Quiz_client /> },
  { path: "/response_display", element: <Response_display /> },
  { path: "/leaderboard", element: <Leaderboard_display /> },
  { path: "/quiz_finish", element: <Quiz_finish_online /> },
  { path: "/home", element: <Initial /> },
  { path: "/login", element: <Login_page /> },
  { path: "/sign_up", element: <Sign_up_Page /> },
  { path: "/account_page", element: <Account_page /> },
  { path: "/create_quiz", element: <Create_quiz_page /> },
  { path: "/join_option", element: <Join_option /> },
  { path: "/sign_up_login", element: <Login_sign_up /> },
  { path: "/create_questions", element: <Create_questions /> },
  { path: "/my_quizzes", element: <My_quizzes /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthContextProvider>
      <SocketContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </SocketContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
