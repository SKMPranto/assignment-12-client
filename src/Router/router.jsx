import React from "react";
import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/LoginPage/Login";
import Register from "../Pages/RegisterPage/Register";
import Error from "../Pages/Error_Page/Error";
import PrivateRoutes from "../Routes/PrivateRoutes";
import DashboardLayOut from "../Layouts/DashboardLayout/DashboardLayOut";
import MyTasks from "../Pages/Dashboard/MyAddedTasks/MyTasks";
import BuyerHome from "../Pages/Dashboard/BuyerHome/BuyerHome";
import AddNewTasks from "../Pages/Dashboard/AddNewTask's/AddNewTasks";
import PurchaseCoin from "../Pages/Dashboard/PurchaseCoin/PurchaseCoin";
import PaymentHistory from "../Pages/Dashboard/PaymentHistory/PaymentHistory";
import UpdateTask from "../Pages/Dashboard/UpdateTask/UpdateTask";
import PayMent from "../Pages/Dashboard/PayMent/PayMent";
import WorkerHome from "../Pages/Dashboard/WorkerDashboard/WorkerHome/WorkerHome";
import TaskList from "../Pages/Dashboard/WorkerDashboard/TaskList/TaskList";
import MySubmissions from "../Pages/Dashboard/WorkerDashboard/MySubmissions/MySubmissions";
import Withdrawals from "../Pages/Dashboard/WorkerDashboard/Withdrawals/Withdrawals";
import DashboardHome from "../Pages/Dashboard/DashboardHome/DashboardHome";
import TaskDetails from "../Pages/Dashboard/WorkerDashboard/TaskList/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "auth/login",
        Component: Login,
      },
      {
        path: "auth/register",
        Component: Register,
      },
    ],
    errorElement: <Error></Error>,
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        <DashboardLayOut></DashboardLayOut>
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        Component: DashboardHome,
      },
      {
        path: "addNewTasks",
        Component: AddNewTasks,
      },
      {
        path: "myTasks",
        Component: MyTasks,
      },
      {
        path: "purchaseCoin",
        Component: PurchaseCoin,
      },
      {
        path: "paymentHistory",
        Component: PaymentHistory,
      },
      {
        path: "updateTask/:id",
        Component: UpdateTask,
      },
      {
        path: "payment",
        Component: PayMent,
      },
      {
        path: "tasklist",
        Component: TaskList,
      },
      {
        path: "mySubmissions",
        Component: MySubmissions,
      },
      {
        path: "withdrawals",
        Component: Withdrawals,
      },
      {
        path: "taskDetails/:id",
        Component: TaskDetails,
      },
    ],
    errorElement: <Error></Error>,
  },
]);

export default router;
