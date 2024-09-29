import React, { useState } from "react";
import api from "../api/index";

const EditProfile = ({ info, setUserData, handleEditMode }) => {
  const [newUsername, setNewUsername] = useState(info.username);
  const [newEmail, setNewEmail] = useState(info.email);
  const [newPassword, setNewPassword] = useState("");
  const [editing, setEditing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUserInfo = {
      username: newUsername,
      email: newEmail,
      password: newPassword,
    };
    updateInfoReq(newUserInfo);
    setUserData((prev) => ({
      ...prev,
      info: { _id: info._id, username: newUsername, email: newEmail },
    }));
    handleEditMode();
  };

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

  return (
    <div className="bg-gray-800 bg-opacity-70 w-full max-w-2xl shadow-lg rounded-xl p-8 text-gray-50">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="block mb-2">
            Username
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            onChange={(e) => {
              setNewUsername(e.target.value);
              setEditing(true);
            }}
            value={newUsername}
            type="text"
            id="username"
            placeholder="Enter new username"
          />
        </div>
        <div>
          <label htmlFor="email" className="block mb-2">
            Email
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            onChange={(e) => {
              setNewEmail(e.target.value);
              setEditing(true);
            }}
            value={newEmail}
            type="text"
            id="email"
            placeholder="Enter new email"
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-2">
            Password
          </label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white"
            onChange={(e) => {
              setNewPassword(e.target.value);
              setEditing(true);
            }}
            type="password"
            id="password"
            placeholder="Enter new password"
          />
        </div>
        {editing && (
          <button
            type="submit"
            className="mt-4 w-full bg-cyan-800 rounded-lg text-white py-2 hover:bg-cyan-700 transition-colors duration-300">
            Save Changes
          </button>
        )}
      </form>
      <button
        className="mt-4 px-4 py-2 bg-red-700 rounded-lg text-white hover:bg-red-600 transition-colors duration-300"
        onClick={handleEditMode}>
        Cancel
      </button>
    </div>
  );
};

export default EditProfile;
