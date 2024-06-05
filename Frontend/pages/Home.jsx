import React from "react";
import { redirect, useNavigate } from "react-router-dom";
import { checkAuth } from "../utils/checkAuth";

const Home = () => {
  const navigate = useNavigate();
  const handleViewProfile = () => {
    navigate("/about");
  };
  if (checkAuth()) {
    return (
      <>
        <h1>Logged In</h1>
        <button
          onClick={() => {
            handleViewProfile();
          }}>
          View Profile
        </button>
      </>
    );
  }
  return (
    <div>
      <button
        onClick={() => {
          navigate(`/login`, { replace: true });
        }}>
        Login
      </button>
      <button
        onClick={() => {
          navigate(`/sign-up`, { replace: true });
        }}>
        Sign-up
      </button>
    </div>
  );
};

export default Home;
