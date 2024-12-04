import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SocketContextProvider } from "./context/socket";

import Home from "./pages/home";
import Question_collection from "./pages/quiz_question";
import Create_game from "./pages/create_game";
import Enter_room from "./pages/enter_room";
import Quiz_live from "./pages/quiz_live";
import Quiz_client from "./pages/quiz_live_client";

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
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SocketContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </SocketContextProvider>
  </StrictMode>
);
