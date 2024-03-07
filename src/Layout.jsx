// En src/components/Layout/Layout.jsx
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
