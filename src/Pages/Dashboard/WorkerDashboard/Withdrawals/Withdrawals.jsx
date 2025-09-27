import React, { useEffect, useState } from "react";
import useAuth from "../../../../Hooks/useAuth";
import Title from "../../../../Sheared/Title/Title";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const Withdrawals = () => {
  Title("Dashboard | Withdrawals");
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState(null);
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, watch } = useForm();
  useEffect(() => {
    axiosSecure.get(`/users/${user?.email}`).then((res) => {
      setUserInfo(res.data);
    });
  }, [axiosSecure, user?.email]);
  //   Handle form submission
  const onSubmit = (data) => {
    const withdrawalInfo = {
      worker_email: user?.email,
      worker_name: user?.displayName,
      withdrawal_coin: data.coinToWithdraw,
      withdrawal_amount: coinToDollar,
      payment_system: data.paymentMethod,
      account_number: data.accountNumber,
      status: "pending",
      withdrawDate: new Date().toISOString(),
    };
    // Post withdrawal info to the server
    axiosSecure
      .post("/withdrawals", withdrawalInfo)
      .then((res) => {
        if (res.data.insertedId) {
          // Deduct buyer's coins
          axiosSecure.patch(`/users/${user.email}/deduct-coins`, {
            amount: data.coinToWithdraw,
          });
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Withdrawal request submitted successfully!",
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
          }).then(()=>{
            window.location.reload();
          })
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Withdrawal request failed! " + err.message,
          showConfirmButton: true,
        });
      });
  };
  //  Track the coin input dynamically
  const coinToWithdraw = watch("coinToWithdraw");

  //  Exact withdrawal amount based on input coins
  const coinToDollar = coinToWithdraw ? coinToWithdraw / 20 : 0;

  //  Total balance in dollars (based on total coins)
  const coinToDollarBalance = userInfo?.coins ? userInfo.coins / 20 : 0;

  return (
    <div>
      <h1 className="text-center md:text-3xl lg:text-4xl text-xl font-bold mt-10">
        Your total coin balance : {userInfo?.coins}
      </h1>
      <h1 className="text-center md:text-2xl  font-bold mt-4">
        Coin to Dollar balance : {coinToDollarBalance} $
      </h1>
      <div className="my-10 flex flex-col md:flex-row justify-center items-center gap-10">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <h1 className="text-3xl font-bold text-center pt-6">Withdrawals</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              {/* Coin to Withdrawal field */}
              <label className="floating-label">
                <span>Coin to Withdraw</span>
                <input
                  {...register("coinToWithdraw")}
                  type="number"
                  className="input validator"
                  required
                  placeholder="Coin to Withdraw"
                  min="200"
                  max={userInfo?.coins || 0}
                  title="You don't have enough coins"
                />
                <p className="validator-hint hidden">
                  You don't have enough coins
                </p>
              </label>
              {/* Withdrawal Amount field */}
              <label className="floating-label mt-1">
                <span>Withdraw Amount - $</span>
                <input
                  {...register("withdrawAmount")}
                  readOnly
                  type="number"
                  className="input validator"
                  value={coinToDollar || 0}
                  step="0.01"
                />
              </label>
              {/* Select payment method field */}
              <label className="floating-label mt-2">
                <span>Select payment method</span>
                <select
                  {...register("paymentMethod")}
                  className="select validator"
                  required
                >
                  <option disabled selected value="">
                    Select payment method
                  </option>
                  <option>Bkash</option>
                  <option>Rocket</option>
                  <option>Nagad</option>
                  <option>Upay</option>
                </select>
                <p className="validator-hint hidden">Select Payment Method</p>
              </label>
              {/* Account Number field */}
              <label className="input validator floating-label mt-1">
                <span>Account Number</span>
                <svg
                  className="h-[1em] opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                >
                  <g fill="none">
                    <path
                      d="M7.25 11.5C6.83579 11.5 6.5 11.8358 6.5 12.25C6.5 12.6642 6.83579 13 7.25 13H8.75C9.16421 13 9.5 12.6642 9.5 12.25C9.5 11.8358 9.16421 11.5 8.75 11.5H7.25Z"
                      fill="currentColor"
                    ></path>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 1C4.61929 1 3.5 2.11929 3.5 3.5V12.5C3.5 13.8807 4.61929 15 6 15H10C11.3807 15 12.5 13.8807 12.5 12.5V3.5C12.5 2.11929 11.3807 1 10 1H6ZM10 2.5H9.5V3C9.5 3.27614 9.27614 3.5 9 3.5H7C6.72386 3.5 6.5 3.27614 6.5 3V2.5H6C5.44771 2.5 5 2.94772 5 3.5V12.5C5 13.0523 5.44772 13.5 6 13.5H10C10.5523 13.5 11 13.0523 11 12.5V3.5C11 2.94772 10.5523 2.5 10 2.5Z"
                      fill="currentColor"
                    ></path>
                  </g>
                </svg>
                <input
                  {...register("accountNumber")}
                  className="w-full"
                  type="tel"
                  required
                  placeholder="Account Number"
                  pattern="^01[3-9][0-9]{8,9}$"
                  minLength={11}
                  maxLength={12}
                  title="Enter a valid Bangladeshi number (11 digits / 12 digits, e.g., 017XXXXXXXX)"
                />
              </label>
              <p className="validator-hint hidden">Must be 11 or 12 digits</p>
              {/* Withdrawal button */}
              <button
                type="submit"
                className="btn btn-neutral mt-4 disabled:!cursor-not-allowed disabled:opacity-50"
                disabled={userInfo?.coins < 200}
              >
                Withdraw
              </button>

              {/* Show message when coins are less than 200 */}
              {userInfo?.coins < 200 && (
                <p className="text-red-500 text-sm mt-2 font-semibold">
                  Insufficient balance! You need at least 200 coins to withdraw.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdrawals;
