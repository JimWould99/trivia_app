import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./pages/home";
import Question_collection from "./pages/quiz_question";
import Quiz_live from "./pages/quiz_live";
import Enter_room from "./pages/enter_room";

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
    path: "/quiz_live",
    element: <Quiz_live />,
  },
  { path: "/join_game", element: <Enter_room /> },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
