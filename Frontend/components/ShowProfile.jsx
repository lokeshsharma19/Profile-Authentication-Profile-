import React from "react";

const ShowProfile = ({ info, handleEditMode }) => {
  return (
    <div className="user-info">
      <h2>user info</h2>
      <h2>{info.username}</h2>
      <h2>{info.email}</h2>
      <button onClick={handleEditMode}>Edit</button>
    </div>
  );
};

export default ShowProfile;
