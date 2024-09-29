import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className="m-0 p-0">
      <Outlet />
    </div>
  );
};

export default RootLayout;
