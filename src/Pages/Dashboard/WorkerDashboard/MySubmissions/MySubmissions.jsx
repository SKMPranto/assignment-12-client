import React from "react";
import Title from "../../../../Sheared/Title/Title";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Sheared/LoaderEffect/Loader";

const MySubmissions = () => {
  Title("Dashboard | My Submissions");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: Tasks = [] } = useQuery({
    queryKey: ["worker-stats", user?.email],
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/submit-task/${user?.email}`);
        return res.data;
      } catch (err) {
        console.error("Error fetching submissions:", err);
        return [];
      }
    },
  });
  if (isPending) return <Loader></Loader>;
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-10">All Submissions</h1>
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
            {Tasks.map((task, index) => (
              <tr key={task._id}>
                <th>{index + 1}</th>
                <td>{task.task_title}</td>
                <td>{task.payable_amount}</td>
                <td>{task.buyer_email}</td>
                <td>
                  {task.status === "approved" ? (
                    <div className="badge badge-success">{task.status}</div>
                  ) : task.status === "pending" ? (
                    <div className="badge badge-warning">{task.status}</div>
                  ) : (
                    <div className="badge badge-error">{task.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MySubmissions;
