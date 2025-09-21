import React from "react";
import useAuth from "../Hooks/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../Sheared/LoaderEffect/Loader";

const PrivateRoutes = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  if (loading) {
    return <Loader></Loader>;
  }
  if(!user){
    return <Navigate state={location.pathname} to="/auth/login"></Navigate>
  }
  return children;
};

export default PrivateRoutes;
