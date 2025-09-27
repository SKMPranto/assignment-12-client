import React, { useEffect, useState } from "react";
import Title from "../../../Sheared/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Sheared/LoaderEffect/Loader";
import Swal from "sweetalert2";

const BuyerHome = () => {
  Title("Dashboard | Buyer Home");
  const { user } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [submissionInfo, setSubmissionInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { isPending, data: Tasks = [] } = useQuery({
    queryKey: ["myTasks", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks?email=${user?.email}`);
      return res.data;
    },
  });
  //   Payment API call to get total payment info
  useEffect(() => {
    axiosSecure
      .get(`/payments/${user?.email}`)
      .then((res) => setPaymentInfo(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, user?.email]);
  //   Submission API call to get total submission info
  useEffect(() => {
    axiosSecure
      .get(`/submittedTask/${user?.email}`)
      .then((res) => setSubmissionInfo(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure, user?.email]);

  const res = axiosSecure.patch();

  //   --- IGNORE ---
  if (isPending) return <Loader></Loader>;
  //   filtering pending tasks
  const pendingTasks = Tasks.filter((task) => task.required_workers > 0) || [];
  //   filtering pending submissions for buyer
  const pendingSubmissions =
    submissionInfo?.filter((task) => task.status === "pending") || [];

  return (
    <div>
      {/* Profile info with task , pending tasks and total payment */}
      <h2 className="text-3xl font-bold text-center mt-10">
        Welcome to Your Dashboard
      </h2>
      <p className="text-center mt-4">
        Here you can see your Total Tasks, and track your Tasks and Payment.
      </p>
      {/* Profile Information */}
      <div className="md:max-w-96  lg:max-w-2xl mx-auto p-6 bg-base-100 border-1 rounded-2xl shadow-2xl space-y-4 my-8 flex flex-col items-center">
        {/* Profile Image */}
        <div className="avatar">
          <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring-2 ring-offset-2">
            <img src={user?.photoURL} />
          </div>
        </div>
        {/* Submission Information */}
        <div className="stats stats-vertical lg:stats-horizontal shadow">
          <div className="stat">
            <div className="stat-title">Total Task count</div>
            <div className="stat-value">{Tasks.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Pending Tasks</div>
            <div className="stat-value">{pendingTasks.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Payment</div>
            <div className="stat-value">
              {paymentInfo?.reduce(
                (acc, item) => acc + (item.amount || 0),
                0
              ) || 0}{" "}
              $
            </div>
          </div>
        </div>
      </div>
      {/* Pending Submissions table */}
      {pendingSubmissions.length === 0 ? (
        <h2 className="text-2xl font-bold text-center my-10">
          No Pending Submissions Yet
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center my-10">
            Pending Submissions
          </h1>
          <div className="overflow-x-auto">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Worker Name</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingSubmissions.map((task, index) => (
                  <tr key={task._id}>
                    <th>{index + 1}</th>
                    <td>{task.task_title}</td>
                    <td>{task.payable_amount}</td>
                    <td>{task.worker_name}</td>
                    <td>
                      <div className="badge badge-info">{task.status}</div>
                    </td>
                    <td className="flex gap-2">
                      {/* View Submission Button */}
                      <label
                        htmlFor={`modal-${task._id}`}
                        className="btn btn-sm btn-primary"
                      >
                        View
                      </label>

                      {/* Approve Button */}
                      <button
                        className="btn btn-sm btn-success"
                        onClick={async () => {
                          try {
                            await axiosSecure.patch(
                              `/submissions/${task._id}/approve`
                            );
                            // Update submission status locally
                            setSubmissionInfo((prev) =>
                              prev.map((item) =>
                                item._id === task._id
                                  ? { ...item, status: "approved" }
                                  : item
                              )
                            );
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "Submission approved",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          } catch (err) {
                            console.error(err);
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "Failed to approve submission",
                              text: err.message,
                              showConfirmButton: true,
                            });
                          }
                        }}
                      >
                        Approve
                      </button>

                      {/* Reject Button */}
                      <button
                        className="btn btn-sm btn-error"
                        onClick={async () => {
                          try {
                            await axiosSecure.patch(
                              `/submissions/${task._id}/reject`
                            );
                            // Update submission status locally
                            setSubmissionInfo((prev) =>
                              prev.map((item) =>
                                item._id === task._id
                                  ? { ...item, status: "rejected" }
                                  : item
                              )
                            );
                            Swal.fire({
                              position: "center",
                              icon: "success",
                              title: "Submission rejected",
                              showConfirmButton: false,
                              timer: 1500,
                            });
                          } catch (err) {
                            console.error(err);
                            Swal.fire({
                              position: "center",
                              icon: "error",
                              title: "Failed to reject submission",
                              text: err.message,
                              showConfirmButton: true,
                            });
                          }
                        }}
                      >
                        Reject
                      </button>

                      {/* Modal for View Submission */}
                      <input
                        type="checkbox"
                        id={`modal-${task._id}`}
                        className="modal-toggle"
                      />
                      <div className="modal">
                        <div className="modal-box relative">
                          <label
                            htmlFor={`modal-${task._id}`}
                            className="btn btn-sm btn-circle absolute right-2 top-2"
                          >
                            ✕
                          </label>
                          <p>{task.submission_info}</p>
                          <p className="mt-2">
                            Worker Email: {task.worker_email}
                          </p>
                          <p>Status: {task.status}</p>
                          <p>Payable Amount: {task.payable_amount}</p>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerHome;
