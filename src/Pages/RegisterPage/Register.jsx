import React, { use, useState } from "react";
import RegisterLottie from "../../assets/Lottie/Register.json";
import Lottie from "lottie-react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Title from "../../Sheared/Title/Title";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { AuthContext } from "../../Contexts/AuthContexts/AuthContext";
import useAuth from "../../Hooks/useAuth";

const Register = () => {
  Title("Register");
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSignUp } = useAuth();
  const onSubmit = (data) => {
    createUser(data.email, data.password)
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome to Tap&Earn",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: e.message,
          showConfirmButton: true,
        });
      });
  };
  const handleGoogleSignUp = () => {
    googleSignUp()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Welcome to Tap&Earn",
          showConfirmButton: false,
          timer: 2500,
        });
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((e) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: e.message,
          showConfirmButton: true,
        });
      });
  };
  return (
    <div className=" mt-10 md:mt-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Login form */}
        <div className=" card backdrop-blur-3xl w-full max-w-sm shrink-0 shadow-2xl border-1 border-gray-200">
          <h1 className="text-5xl text-center font-bold pt-2">Register now!</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              {/* User name field */}
              <label className="floating-label">
                <span>UserName</span>
                <label className="input validator">
                  {" "}
                  <input
                    {...register("username")}
                    type="text"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\- ]*"
                    minlength="3"
                    maxlength="30"
                    title="Only letters, numbers, space or dash"
                  />
                </label>
              </label>

              <p className="validator-hint hidden">
                Must be 3 to 30 characters
                <br />
                containing only letters, numbers, space or dash
              </p>
              {/* Photo url field */}
              {/* Role input field */}
              <label className="label">Select your role</label>
              <select
                {...register("role", { required: true })}
                className="select validator"
                defaultValue=""
              >
                <option value="" disabled>
                  Choose:
                </option>
                <option value="Worker">Worker</option>
                <option value="Buyer">Buyer</option>
                <option value="Admin">Admin</option>
              </select>
              <p className="validator-hint hidden">Required</p>

              {/* Email field */}
              <label className="floating-label my-1">
                <span>Enter your email</span>
                <label className="input validator">
                  {" "}
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </g>
                  </svg>
                  <input
                    {...register("email")}
                    name="email"
                    type="email"
                    required
                    placeholder="mail@site.com"
                  />
                </label>
              </label>
              <div className="validator-hint hidden">
                Enter valid email address
              </div>

              {/* Password field */}
              <label className="floating-label">
                <span>Enter your Password</span>
                <label className="input validator">
                  {" "}
                  <svg
                    className="h-[1em] opacity-50"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <g
                      strokeLinejoin="round"
                      strokeLinecap="round"
                      strokeWidth="2.5"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                      <circle
                        cx="16.5"
                        cy="7.5"
                        r=".5"
                        fill="currentColor"
                      ></circle>
                    </g>
                  </svg>
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    name="password"
                    required
                    placeholder="Password"
                    minLength="8"
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
                    className="w-full pr-16"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </label>
              </label>
              <p className="validator-hint hidden">
                Must be more than 8 characters, including
                <br />
                At least one number
                <br />
                At least one lowercase letter
                <br />
                At least one uppercase letter
              </p>
              <button className="btn btn-neutral mt-4">Register</button>
              <div className="divider my-0">OR</div>
            </form>
            {/* Google login */}
            <button
              onClick={handleGoogleSignUp}
              className="btn bg-white text-black border-[#e5e5e5]"
            >
              <svg
                aria-label="Google logo"
                width="36"
                height="36"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="text-lg">Register with Google</span>
            </button>
            <div>
              Already have an account !{" "}
              <NavLink
                to="/auth/login"
                className="text-red-500 link link-hover"
              >
                Login
              </NavLink>
            </div>
          </div>
        </div>
        {/* Lottie animation */}
        <div className="2xl:w-[40%] text-center lg:text-left">
          <Lottie
            style={{ width: 400, height: 400 }}
            animationData={RegisterLottie}
            loop={true}
          ></Lottie>
        </div>
      </div>
    </div>
  );
};

export default Register;
