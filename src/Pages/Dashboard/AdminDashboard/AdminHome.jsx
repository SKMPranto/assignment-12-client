import React, { useEffect, useState } from "react";
import Title from "../../../Sheared/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Sheared/LoaderEffect/Loader";
import Swal from "sweetalert2";

const AdminHome = () => {
  Title("Dashboard | Admin Home");
  const { user } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState(null);
  const [withdrawalInfo, setWithdrawalInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { isPending, data: userInfo = [] } = useQuery({
    queryKey: ["allUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  // Get the total payment info
  useEffect(() => {
    axiosSecure
      .get("payments")
      .then((res) => setPaymentInfo(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  //   get all withdrawal info
  useEffect(() => {
    axiosSecure
      .get("withdrawals")
      .then((res) => setWithdrawalInfo(res.data))
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  //   Approve withdrawal
  const handleApprove = (id) => {
    axiosSecure
      .patch(`/withdrawals/${id}/approve`)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Withdrawal request approved and coins updated!",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
          }).then(() => {
            window.location.reload(); // refresh to update UI
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "withdrawal failed! " + err.message,
          showConfirmButton: true,
        });
      });
  };

  // Ignore
  if (isPending) return <Loader></Loader>;
  // Filtering total worker
  const totalWorker = userInfo.filter((user) => user.role === "Worker") || [];
  // Filtering total buyer
  const totalBuyer = userInfo.filter((user) => user.role === "Buyer") || [];
  //   Filtering pending withdrawal
  const pendingWithdrawals =
    withdrawalInfo?.filter((withdrawal) => withdrawal.status === "pending") ||
    [];
  return (
    <div>
      {/* Profile Section */}
      <h2 className="text-3xl font-bold text-center mt-10">
        Welcome to Your Dashboard
      </h2>
      <p className="text-center mt-4">
        Here you can manage your users, buyers and withdrawal system.
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
            <div className="stat-title">Total Worker</div>
            <div className="stat-value">{totalWorker.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Buyer</div>
            <div className="stat-value">{totalBuyer.length}</div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Available Coin</div>
            <div className="stat-value">
              {userInfo?.reduce((acc, user) => acc + user.coins, 0) || 0} Coins
            </div>
          </div>

          <div className="stat">
            <div className="stat-title">Total Payments</div>
            <div className="stat-value">{paymentInfo?.length} </div>
          </div>
        </div>
      </div>
      {/* Pending Withdrawals */}
      {pendingWithdrawals.length === 0 ? (
        <h2 className="text-2xl font-bold text-center my-10">
          No Pending Submissions Yet
        </h2>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-center my-10">
            Pending Withdrawals
          </h1>
          <div className="overflow-x-auto mb-10">
            <table className="table table-zebra">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>worker_name</th>
                  <th>withdrawal_coin</th>
                  <th>withdrawal_amount</th>
                  <th>payment_system</th>
                  <th>account_number</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingWithdrawals.map((withdrawal, index) => (
                  <tr key={withdrawal._id}>
                    <th>{index + 1}</th>
                    <td>{withdrawal.worker_name}</td>
                    <td>{withdrawal.withdrawal_coin}</td>
                    <td>{withdrawal.withdrawal_amount} $</td>
                    <td>{withdrawal.payment_system}</td>
                    <td>{withdrawal.account_number}</td>
                    <td>
                      <div className="badge badge-info">
                        {withdrawal.status}
                      </div>
                    </td>
                    <td className="flex gap-2">
                      {/* Approve Button */}
                      <button
                        onClick={() => handleApprove(withdrawal._id)}
                        className="btn btn-sm btn-success"
                      >
                        Approve
                      </button>
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

export default AdminHome;
