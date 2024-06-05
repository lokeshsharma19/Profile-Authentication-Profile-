import React, { useEffect, useState } from "react";
import ShowProfile from "../components/ShowProfile";
import EditProfile from "../components/EditProfile";
import useUserData from "../hooks/useUserData";
import SessionModal from "../layout/SessionModal";
import { checkAuth } from "../utils/checkAuth";
import { redirect } from "react-router-dom";

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
  console.log(userData.info);
  useEffect(() => {
    if (userData.isError) {
      setSessionModalOpen(true);
    }
  }, [userData]);

  const handleEditMode = () => {
    setEditMode(!editMode);
  };
  const showContent = editMode ? (
    <EditProfile
      {...userData}
      setUserData={setUserData}
      handleEditMode={handleEditMode}
    />
  ) : (
    <ShowProfile {...userData} handleEditMode={handleEditMode} />
  );
  return (
    <div>
      <nav>
        <h2>About</h2>
      </nav>
      <div className="aboutSection">{showContent}</div>
      {sessionModalOpen && <SessionModal {...userData} />}
    </div>
  );
};

export default About;
