import React, { useState } from "react";
import api from "../api/index";

const EditProfile = ({ info, setUserData, handleEditMode }) => {
  const updateInfoReq = async (newUserInfo) => {
    try {
      const endpoint = `/user/${info._id}`;
      const response = await api.patch(endpoint, newUserInfo);
      if (response.status >= 200 && response.status < 400) {
        const accessToken = response?.data?.accessToken;
        localStorage.setItem("token", JSON.stringify(accessToken));
      } else {
        console.error("Cannot update");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [editing, setEditing] = useState(false);
  const [newUsername, setNewUsername] = useState(info.username);
  const [newEmail, setNewEmail] = useState(info.email);
  const [newPassword, setNewPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserInfo = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
    };
    updateInfoReq(newUserInfo);
    const newUserData = {
      _id: info._id,
      username: newUsername,
      email: newEmail,
    };
    setUserData((prev) => ({
      ...prev,
      info: newUserData,
    }));
    handleEditMode();
  };
  return (
    <div>
      <h2>Edit Info will change everywhere</h2>
      <button onClick={handleEditMode}>Cancel</button>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={(e) => {
              setNewUsername(e.target.value);
              setEditing(true);
            }}
            value={newUsername}
            type="text"
            id="username"
            placeholder="username or email"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            onChange={(e) => {
              setNewEmail(e.target.value);
              setEditing(true);
            }}
            value={newEmail}
            type="text"
            id="email"
            placeholder="xyz@gmail.com"
          />
        </div>
        <div>
          <h3>Change Password</h3>
          <label htmlFor="password">New Password:</label>
          <input
            onChange={(e) => {
              setNewPassword(e.target.value);
              setEditing(true);
            }}
            type="text"
            id="password"
            placeholder="min 8 characters"
          />
        </div>
        {editing && <button type="submit">Save</button>}
      </form>
    </div>
  );
};

export default EditProfile;
