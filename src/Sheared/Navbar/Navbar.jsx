import React, { useEffect, useState } from "react";
import { MdOutlineNotificationImportant } from "react-icons/md";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { IoLogIn, IoLogOut } from "react-icons/io5";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Navbar = () => {
  const { user, userLogOut } = useAuth();
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/users/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosSecure]);

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
  const NavItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="https://github.com/SKMPranto"
          target="_blank"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Join as Developer
        </NavLink>
      </li>
    </>
  );
  const NavItems2 = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Dashboard
        </NavLink>
      </li>
      <a className="text-lg font-bold p-1.5 mr-5">
        {userInfo && `Available Coins : ${userInfo.coins}`}
      </a>
      <li>
        <NavLink
          to="https://github.com/SKMPranto"
          target="_blank"
          className={({ isActive }) =>
            isActive
              ? "text-xl font-bold underline underline-offset-1 text-red-400"
              : "text-xl font-bold"
          }
        >
          Join as Developer
        </NavLink>
      </li>
    </>
  );
  return (
    <div className="navbar bg-base-100 shadow-sm mb-3">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            {user ? NavItems2 : NavItems}
          </ul>
        </div>
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
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 bg-white">
          {user ? NavItems2 : NavItems}
        </ul>
      </div>
      <div className="navbar-end">
        {/* Profile and notification part */}
        <div className="flex-none px-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle px-8"
            >
              <div className="indicator">
                <MdOutlineNotificationImportant size="25px" />
                <span className="badge badge-sm indicator-item">8</span>
              </div>
            </div>
            <div
              tabIndex={0}
              className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
            >
              <div className="card-body">
                <span className="text-lg font-bold">8 Items</span>
                <span className="text-info">Subtotal: $999</span>
              </div>
            </div>
          </div>
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
        {/* Login and logout button */}
        <div>
          {user ? (
            <Link
              onClick={handleLogOut}
              className="btn btn-info font-bold text-lg"
            >
              LogOut <IoLogOut />
            </Link>
          ) : (
            <Link to="auth/login" className="btn btn-info font-bold text-lg">
              Login <IoLogIn />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
