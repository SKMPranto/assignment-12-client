import React, { useEffect, useState } from "react";
import BuyerHome from "../BuyerHome/BuyerHome";
import WorkerHome from "../WorkerDashboard/WorkerHome/WorkerHome";
import Title from "../../../Sheared/Title/Title";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

const DashboardHome = () => {
  Title("Dashboard | Home");
  const [userInfo, setUserInfo] = useState([]);
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);
  return (
    <div>
      {(userInfo?.role === "Buyer" && <BuyerHome></BuyerHome>) ||
        (userInfo?.role === "Worker" && <WorkerHome></WorkerHome>)}
    </div>
  );
};

export default DashboardHome;
