import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import SignUp, { signUpLoader } from "../pages/SignUp";
import Profile, { profileLoader } from "../pages/Profile";
import { loginLoader } from "../pages/Login";
import Home from "../pages/Home";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} loader={loginLoader} />
        <Route path="/sign-up" element={<SignUp />} loader={signUpLoader} />
        <Route path="/about" element={<Profile />} loader={profileLoader} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
