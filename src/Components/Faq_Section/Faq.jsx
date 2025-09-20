import React from "react";

const Faq = () => {
  return (
    <div className="my-20">
      <div>
        <h1 className="text-center font-extrabold text-3xl my-10">
          {" "}
          <span className="text-red-500">FAQ</span> or Help Section
        </h1>
      </div>
      {/* Question no 01 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title font-semibold">How do I get paid ?</div>
        <div className="collapse-content text-sm">
          You can withdraw your earnings directly to your preferred payment
          method (such as Bkash, Nagad, PayPal, or bank transfer, depending on
          your region). Once you reach the minimum withdrawal amount, just place
          a withdrawal request and we’ll process it.
        </div>
      </div>
      {/* Question no 02 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Are the tasks safe?
        </div>
        <div className="collapse-content text-sm">
          Yes! All tasks on our platform are carefully checked before being published. We only allow legitimate and verified tasks from trusted buyers to ensure your safety and a smooth experience.
        </div>
      </div>
      {/* Question no 03 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          How long does it take to withdraw earnings?
        </div>
        <div className="collapse-content text-sm">
          Withdrawals are usually processed within 24–48 hours. In some cases, it may take a little longer depending on the payment method you choose. You’ll always be able to track your request status in your dashboard.
        </div>
      </div>
      {/* Question no 04 */}
      <div className="collapse collapse-arrow bg-base-100 border border-base-300">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title font-semibold">
          Is there a referral program?
        </div>
        <div className="collapse-content text-sm">
          Yes! You can invite your friends using your unique referral link. Each time your friend earns money, you’ll also receive a bonus commission as a reward — helping you increase your income even faster.
        </div>
      </div>
    </div>
  );
};

export default Faq;
