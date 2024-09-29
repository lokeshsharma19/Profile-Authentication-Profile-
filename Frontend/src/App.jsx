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
import QuizManager from "../layout/QuizManager";
import Quiz from "../pages/Quiz";
import Leaderboard from "../pages/Leaderboard";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} loader={loginLoader} />
        <Route path="/sign-up" element={<SignUp />} loader={signUpLoader} />
        <Route path="/about" element={<Profile />} loader={profileLoader} />
        <Route path="/quizzes" element={<QuizManager />}>
          <Route path=":id" element={<Quiz />} />
        </Route>
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    )
  );
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
