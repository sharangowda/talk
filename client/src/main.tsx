import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import App from "./App.tsx";
import ChatPage from "./pages/chat.tsx";
import ProfilePage from "./pages/profile.tsx";
import Login from "./pages/login.tsx";
import NotFound from "./pages/404.tsx";
import pb from "./lib/client.tsx";
import { HomePage } from "./pages/home.tsx";

function checkAuth() {
  console.log(pb.authStore.isValid);
  return pb.authStore.isValid;
}

function reqAuth() {
  const loginState = pb.authStore.isValid;
  if (loginState) {
    console.log(pb.authStore.isValid);
    return <HomePage />;
  } else {
    console.log(pb.authStore.isValid);
    return redirect("/auth");
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    loader: reqAuth,
  },
  {
    path: "/profile/:id",
    element: <ProfilePage />,
  },
  {
    path: "/auth",
    element: <Login />,
  },
  {
    path: "/chat",
    element: <ChatPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
