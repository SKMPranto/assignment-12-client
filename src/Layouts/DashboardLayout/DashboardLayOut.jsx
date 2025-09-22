import React from "react";
import { NavLink, Outlet } from "react-router";
import Navbar from "../../Sheared/Navbar/Navbar";
import Footer from "../../Sheared/Footer/Footer";

const DashboardLayOut = () => {
  const BuyerNavItems = (
    <>
      <li>
        <NavLink to="/dashboard/buyerHome">Home</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/addNewTasks">AddNew Task's</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/myTasks">My Task's</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/purchaseCoin">Purchase Coin</NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/paymentHistory">Payment History</NavLink>
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
            <div className="flex-none">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <a className="justify-between">
                        Profile
                        <span className="badge">New</span>
                      </a>
                    </li>
                    <li>
                      <a>Settings</a>
                    </li>
                    <li>
                      <a>Logout</a>
                    </li>
                  </ul>
                </div>
              </ul>
            </div>
          </div>
          {/* Page content DownHere */}
          <div className="min-h-[calc(100vh-72px)] w-[97%] md:w-[95%] lg:w-[90%] 2xl:w-[70%] mx-auto">
            <Outlet> </Outlet>
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
