import React from "react";
import { useNavigate } from "react-router-dom";

const SessionModal = ({ status, error }) => {
  const navigate = useNavigate();
  return (
    <div>
      {status}
      {error.errorMsg}
      <button
        className=""
        onClick={() => {
          navigate("/login");
        }}>
        Log in
      </button>
    </div>
  );
};

export default SessionModal;
