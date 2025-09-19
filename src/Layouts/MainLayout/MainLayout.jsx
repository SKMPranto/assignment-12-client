import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Sheared/Navbar/Navbar";
import Footer from "../../Sheared/Footer/Footer";
const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-72px)] w-[97%] md:w-[95%] lg:w-[90%] 2xl:w-[70%] mx-auto">
        <Outlet> </Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
