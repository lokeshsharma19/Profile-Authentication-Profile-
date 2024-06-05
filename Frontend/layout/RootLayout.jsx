import React from "react";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      AMDB
      <Outlet />
    </div>
  );
};

export default RootLayout;
