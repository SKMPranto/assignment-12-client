import React from "react";
import Title from "../../../Sheared/Title/Title";
import useAuth from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loader from "../../../Sheared/LoaderEffect/Loader";

const PaymentHistory = () => {
  Title("Dashboard | Payment History");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: paymentHistory = [] } = useQuery({
    queryKey: ["my-payments", user.email],
    queryFn: async () => {
      const res = await axiosSecure
        .get(`/payments/${user.email}`)
        .then()
        .catch();
      return res.data;
    },
  });
  if (isPending) {
    return <Loader></Loader>;
  }

// Sort payments by date descending (latest first)
const sortedPayments = [...paymentHistory].sort(
  (a, b) => new Date(b.date) - new Date(a.date)
);

  if (!paymentHistory || paymentHistory.length === 0) {
    return (
      <div>
        <h1 className="text-lg md:text-4xl lg:text-5xl font-bold text-red-300 text-center my-30">
          No Payment history found
        </h1>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-red-400 font-bold text-center mt-10">
        Your Payment History
      </h1>

      {/* Table Format */}
      <div className="overflow-x-auto mt-10 mb-10">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>SL No.</th>
              <th>Name</th> {/* ✅ Name column added */}
              <th>Email</th>
              <th>Coins</th>
              <th>Amount</th>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Card</th>
            </tr>
          </thead>
          <tbody>
            {sortedPayments.map((p, index) => (
              <tr key={p._id}>
                <td>{index + 1}</td>
                <td>{p.name}</td> {/* ✅ Display name */}
                <td>{p.email}</td>
                <td>{p.coins}</td>
                <td>${p.amount}</td>
                <td>{p.transactionId}</td>
                <td>{new Date(p.date).toLocaleString()}</td>
                <td>
                  {p.card
                    ? `${p.card.brand.toUpperCase()} ****${p.card.last4} exp ${
                        p.card.exp_month
                      }/${p.card.exp_year}`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentHistory;
