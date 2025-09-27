import React, { useEffect, useState } from "react";
import Title from "../../../../Sheared/Title/Title";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Sheared/LoaderEffect/Loader";

const WorkerHome = () => {
  Title("Dashboard | Worker Home");
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null)
  const axiosSecure = useAxiosSecure();
  const {isPending, data : Tasks = []} = useQuery({
    queryKey: ["myTasks", user?.email],
    queryFn: async ()=>{
      const res = await axiosSecure.get(`/submit-task/${user?.email}`);
      return res.data;
    }
  })

  useEffect(()=>{
    axiosSecure.get(`/users/${user?.email}`).then((res)=>{
      setUserInfo(res.data);
    })
  }, [axiosSecure, user?.email])

  if (isPending) return <Loader></Loader>;
  const pendingTasks = Tasks.filter((task) => task.status === "pending") || [];
  const approvedTasks =
    Tasks.filter((task) => task.status === "approved") || [];

  return (
    <div>
      <h2 className="text-3xl font-bold text-center mt-10">
        Welcome to Your Dashboard
      </h2>
      <p className="text-center mt-4">
        Here you can see your submissions, and track your earnings.
      </p>
      {/* Profile Information */}
      <div className="md:max-w-96  lg:max-w-2xl mx-auto p-6 bg-base-100 border-1 rounded-2xl shadow-2xl space-y-4 my-8 flex flex-col items-center">
        {/* Profile Image */}
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <img src={userInfo?.photoURL} />
          </div>
        </div>
        {/* Submission Information */}
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Total Submissions</div>
            <div className="stat-value">{Tasks.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Pending Submissions</div>
            <div className="stat-value">{pendingTasks.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Earnings</div>
            <div className="stat-value">{userInfo?.coins || 0} Coins</div>
          </div>
        </div>
      </div>
      {/* Approved Submissions table */}
      <h1 className="text-2xl font-bold text-center my-10">
        Approved Submissions
      </h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Task Title</th>
              <th>Payable Amount</th>
              <th>Buyer Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {approvedTasks.map((task, index) => (
              <tr key={task._id}>
                <th>{index + 1}</th>
                <td>{task.task_title}</td>
                <td>{task.payable_amount}</td>
                <td>{task.buyer_email}</td>
                <td>
                  <div className="badge badge-info">{task.status}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerHome;
