import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useLocation } from "react-router"; // to get pack info
import useAxiosSecure from "../../../Hooks/useAxiosSecure"; // axios hook
import useAuth from "../../../Hooks/useAuth"; // to get logged in user
import Swal from "sweetalert2";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { state } = useLocation();
  const pack = state?.pack; //  get { coins, amount } from PurchaseCoin
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const amount = pack?.amount;
  const amountInCents = amount * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    if (!stripe || !elements) return;

    setLoading(true);

    const card = elements.getElement(CardElement);
    if (!card) return;
    // Step 1 : check the card is valid or not
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      //  If payment successful, update coins in DB
      try {
        await axiosSecure.patch(`/users/${user.email}/add-coins`, {
          coins: pack.coins,
        });

        Swal.fire({
          icon: "success",
          title: "Payment Successful",
          text: `You purchased ${pack.coins} coins!`,
          showConfirmButton: false,
          timer: 2000,
          allowOutsideClick: false,
        }).then(() => {
          window.location.reload();
        });
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Failed to update coins",
          text: err.message,
        });
      }

      setErrorMsg("");
      setLoading(false);
    }

    // Step 2 : create payment intent
    const res = await axiosSecure.post("/create-payment-intent", {
      amountInCents,
    });

    // Step 3 : Confirm Payment
    const clientSecret = res.data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    });
    if (result.error) {
      setErrorMsg(result.error.message);
    } else {
      setErrorMsg("");
      if (result.paymentIntent.status === "succeeded") {
        // Step 4 : Create the payment history
        await axiosSecure.post("/payment-history", {
          name: user?.displayName,
          email: user?.email,
          coins: pack?.coins,
          amount: pack?.amount,
          transactionId: result?.paymentIntent.id,
          date: new Date(),
          card: {
            brand: paymentMethod.card.brand,
            last4: paymentMethod.card.last4,
            exp_month: paymentMethod.card.exp_month,
            exp_year: paymentMethod.card.exp_year,
          },
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md bg-white shadow-lg rounded-xl p-6 space-y-5 mx-auto mt-5"
    >
      <h2 className="text-xl font-bold text-center text-indigo-600">
        Pay ${pack?.amount} for {pack?.coins} coins
      </h2>

      <div className="p-3 border border-gray-300 rounded-lg bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#32325d",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
          }}
        />
      </div>

      {errorMsg && (
        <p className="text-red-500 text-sm text-center">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className={`w-full py-3 rounded-lg font-semibold text-white transition btn ${
          loading
            ? "bg-indigo-400 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading
          ? "Processing..."
          : `Pay $${pack?.amount || 0} for ${pack?.coins} coins`}
      </button>
    </form>
  );
};

export default PaymentForm;
