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
import Calender from "./pages/calender.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

function reqAuth() {
  const loginState = pb.authStore.isValid;
  if (loginState) {
    return <HomePage />;
  } else {
    throw redirect("/auth");
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
    loader: () => {
      if (!pb.authStore.isValid) {
        throw redirect("/auth");
      }
      return <ProfilePage />;
    },
  },
  {
    path: "/auth",
    element: <Login />,
    loader: () => {
      if (pb.authStore.isValid) {
        console.log("prin");
        throw redirect("/");
      }
      return <Login />;
    },
  },
  {
    path: "/calender",
    element: <Calender />,
    loader: () => {
      if (!pb.authStore.isValid) {
        throw redirect("/auth");
      }
      return <Calender />;
    },
  },
  {
    path: "/chat",
    element: <ChatPage />,
    loader: () => {
      if (!pb.authStore.isValid) {
        throw redirect("/auth");
      }
      return <ChatPage />;
    },
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-key">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
