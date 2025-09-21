import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import Navbar from "../../Sheared/Navbar/Navbar";
import Footer from "../../Sheared/Footer/Footer";
import Loader from "../../Sheared/LoaderEffect/Loader";
const MainLayout = () => {
  const location = useLocation();
  const [loading,setLoading]= useState(false);
  useEffect(()=>{
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false)
    },150);
    return ()=> clearTimeout(timeout)
  },[location])
  return (
    <div>
      {loading && <Loader></Loader>}
      <Navbar></Navbar>
      <div className="min-h-[calc(100vh-72px)] w-[97%] md:w-[95%] lg:w-[90%] 2xl:w-[70%] mx-auto">
        <Outlet> </Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};
export default MainLayout;
