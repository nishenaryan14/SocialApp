import { useContext } from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
  Navigate,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import Messenger from "./pages/messenger/Messenger";

function App() {
  const { user } = useContext(AuthContext);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={user ? <Home /> : <Register />} />
        <Route path="login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="messenger"
          element={!user ? <Navigate to="/" /> : <Messenger />}
        />
        <Route path="profile/:username" element={<Profile />} />
      </>
    )
  );
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
