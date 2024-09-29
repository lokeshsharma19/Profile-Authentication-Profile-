import React, { useEffect, useState } from "react";
import ShowProfile from "../components/ShowProfile";
import EditProfile from "../components/EditProfile";
import useUserData from "../hooks/useUserData";
import SessionModal from "../layout/SessionModal";
import { checkAuth } from "../utils/checkAuth";
import { redirect, useNavigate } from "react-router-dom";
import api from "../api/index";

export const profileLoader = async () => {
  if (!checkAuth()) {
    return redirect("/login?redirectTo=/about");
  }
  return null;
};

const About = () => {
  const [editMode, setEditMode] = useState(false);
  const [sessionModalOpen, setSessionModalOpen] = useState(false);
  const { userData, setUserData } = useUserData();
  console.log(userData);
  const navigate = useNavigate();

  useEffect(() => {
    if (userData.isError) {
      setSessionModalOpen(true);
    }
  }, [userData]);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  const handleSignOut = async () => {
    try {
      const response = await api.post("/auth/logout");
      localStorage.removeItem("token");
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const showContent = editMode ? (
    <EditProfile
      {...userData}
      setUserData={setUserData}
      handleEditMode={handleEditMode}
    />
  ) : (
    <ShowProfile
      {...userData}
      handleSignOut={handleSignOut}
      handleEditMode={handleEditMode}
    />
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-gray-900 to-black text-gray-50 p-6">
      <nav className="w-full flex justify-between items-center my-6 px-6">
        <h2 className="text-3xl font-bold">Profile</h2>
      </nav>
      <div className="w-full max-w-4xl bg-gray-800 bg-opacity-70 shadow-lg rounded-xl p-8">
        {showContent}
      </div>
      {sessionModalOpen && <SessionModal {...userData} />}
    </div>
  );
};

export default About;
