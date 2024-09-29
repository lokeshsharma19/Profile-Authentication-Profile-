import React from "react";

const ShowProfile = ({ info, handleEditMode, handleSignOut }) => {
  return (
    <div className="bg-gray-800 bg-opacity-70 w-full max-w-2xl shadow-lg rounded-xl p-8 text-gray-50">
      <h2 className="text-2xl font-bold mb-6">User Information</h2>
      <div className="text-lg mb-4">
        <p>Username: {info.username}</p>
        <p>Email: {info.email}</p>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-cyan-800 rounded-xl text-white hover:bg-cyan-700 transition-colors duration-300"
        onClick={handleEditMode}>
        Edit
      </button>
      <button
        className="mt-6 ml-4 px-4 py-2 bg-red-600 rounded-xl text-white hover:bg-red-500 transition-colors duration-300"
        onClick={handleSignOut}>
        Sign Out
      </button>
    </div>
  );
};

export default ShowProfile;
