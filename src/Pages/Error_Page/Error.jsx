import React from "react";
import ErrorLottie from "../../assets/Lottie/Error 404.json";
import Lottie from "lottie-react";
import { NavLink } from "react-router";
const Error = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <Lottie
        style={{ width: 400, height: 400 }}
        animationData={ErrorLottie}
        loop={true}
      ></Lottie>
      <p className="text-center font-bold pt-5 md:text-2xl lg:text-3xl mb-5">
        Sorry, the page you are looking for does not exist.
      </p>
      <NavLink
        to="/"
        className="btn btn-wide btn-outline btn-error text-2xl font-bold"
      >
        Back to home
      </NavLink>
    </div>
  );
};

export default Error;
