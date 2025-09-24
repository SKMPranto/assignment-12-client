import React, { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router";
import Navbar from "../../Sheared/Navbar/Navbar";
import Footer from "../../Sheared/Footer/Footer";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Title from "../../Sheared/Title/Title";

const DashboardLayOut = () => {
  Title("Dashboard");
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const axiosInstance = useAxios();
  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosInstance]);
  const handleLogOut = () => {
    userLogOut().then(() => {
      setUserInfo(null);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully logged Out",
        showConfirmButton: false,
        timer: 2000,
      });
      navigate("/");
    });
  };
  const BuyerNavItems = (
    <>
      <li>
        <NavLink to="/dashboard" className="text-xl font-bold">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/addNewTasks"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          AddNew Task's
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/myTasks"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          My Task's
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/purchaseCoin"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Purchase Coin
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard/paymentHistory"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Payment History
        </NavLink>
      </li>
    </>
  );
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center">
          {/* Navbar */}
          <div className="navbar bg-base-200 w-full">
            <div className="flex-none lg:hidden">
              <label
                htmlFor="my-drawer-2"
                aria-label="open sidebar"
                className="btn btn-square btn-ghost"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block h-6 w-6 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </label>
            </div>
            <div className="mx-2 flex-1 px-2"></div>
            {/* Profile Section */}
            <div className="flex-none px-5">
              <div className="dropdown dropdown-hover dropdown-end pl-2">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Image"
                      src={
                        user
                          ? user?.photoURL
                          : "https://i.ibb.co/jZDk7XVG/user-icon.png"
                      }
                    />
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow text-2xl"
                >
                  {user ? (
                    <div>
                      <h1 className="pl-2">
                        <span className="text-sm">{userInfo?.username}</span>
                      </h1>
                      <h1 className="pl-2">
                        <span className="text-sm">{userInfo?.email}</span>
                      </h1>
                      <h1 className="pl-2">
                        <div className="badge badge-info text-sm">
                          User Role : {userInfo?.role}
                        </div>
                      </h1>
                      <h1 className="pl-2">
                        <div className="badge badge-info text-sm">
                          Available Coins : {userInfo?.coins}
                        </div>
                      </h1>
                      <li>
                        <Link onClick={handleLogOut}>
                          LogOut <IoLogOut />
                        </Link>
                      </li>
                    </div>
                  ) : (
                    <div className="p-2 text-center">
                      <p className="text-sm mb-2">
                        Please log in to see your profile
                      </p>
                      <li>
                        <Link to="auth/login">
                          Login <IoLogIn />
                        </Link>
                      </li>
                    </div>
                  )}
                </ul>
              </div>
            </div>
          </div>
          {/* Page content DownHere */}
          <div className="min-h-[calc(100vh-72px)] w-[97%] md:w-[95%] lg:w-[90%] 2xl:w-[95%] mx-auto">
            <Outlet></Outlet>
          </div>
          {/* Page content UpHere */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
            {/* Sidebar content here */}
            {/* Website name and logo */}
            <NavLink
              to="/"
              className="hidden md:block md:flex items-center space-x-2"
            >
              <img
                src="https://i.ibb.co.com/DDNMKG4G/Tap-Earn-removebg.png"
                alt="Logo"
                className="h-13"
              />
            </NavLink>
            <div className="pl-10">{BuyerNavItems}</div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DashboardLayOut;
