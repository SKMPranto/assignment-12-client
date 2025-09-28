import React, { useState } from "react";
import RegisterLottie from "../../assets/Lottie/Register.json";
import Lottie from "lottie-react";
import { NavLink, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Title from "../../Sheared/Title/Title";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Register = () => {
  Title("Register");
  const location = useLocation();
  const Navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const { createUser, googleSignUp, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  // -------------------- REGISTER FUNCTION --------------------
  const onSubmit = async (data) => {
    createUser(data.email, data.password).then(async () => {
      // Upload user info in database
      const userInfo = {
        username: data.username,
        photoURL: profilePic,
        role: data.role,
        email: data.email,
        password: data.password,
        created_at: new Date().toISOString(),
        last_log_in: new Date().toISOString(),
      };

      const userRes = await axiosSecure.post("/users", userInfo);

      // update User profile in firebase
      const userProfile = {
        displayName: data.username,
        photoURL: profilePic,
      };
      updateUserProfile(userProfile)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Registered Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          Navigate(`${location.state ? location.state : "/"}`);
        })
        .catch((error) => {
          Swal.fire({
            position: "center",
            icon: "error",
            title: error.message,
            showConfirmButton: true,
          });
        });
    });
  };

  // -------------------- GOOGLE SIGNUP --------------------
  const handleGoogleSignUp = async () => {
    googleSignUp()
      .then(async (result) => {
        const user = result.user;

        // 👉 Ask for role using SweetAlert2 modal
        const { value: role } = await Swal.fire({
          title: "Choose Your Role",
          input: "radio",
          inputOptions: {
            Worker: "Worker (earn coins by tasks)",
            Buyer: "Buyer (post tasks and hire workers)",
          },
          inputValidator: (value) => {
            if (!value) {
              return "You need to choose a role!";
            }
          },
          confirmButtonText: "Continue",
          allowOutsideClick: false,
        });

        if (!role) return; // user cancelled

        // Build user info
        const userInfo = {
          username: user.displayName,
          photoURL: user.photoURL,
          role: role, // chosen from modal
          email: user.email,
          created_at: new Date().toISOString(),
          last_log_in: new Date().toISOString(),
        };

        // Save to backend
        const userRes = await axiosSecure.post("/users", userInfo);

        Swal.fire({
          position: "center",
          icon: "success",
          title: "You have logged in successfully",
          showConfirmButton: false,
          timer: 1500,
        });

        Navigate(`${location.state ? location.state : "/"}`);
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
  //----------------------- Upload Image in IMGBB -------------------------
  const handleImageUpload = async (e) => {
    setLoading(true);
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);
    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;
    try {
      const res = await axios.post(imageUploadUrl, formData);
      setProfilePic(res.data.data.url);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed. Try again!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 md:mt-20">
      <div className="hero-content flex-col lg:flex-row-reverse">
        {/* Register form */}
        <div className="card backdrop-blur-3xl w-full max-w-sm shrink-0 shadow-2xl border-1 border-gray-200">
          <h1 className="text-5xl text-center font-bold pt-2">Register now!</h1>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              {/* Username */}
              <label className="floating-label">
                <span>UserName</span>
                <label className="input validator">
                  <input
                    {...register("username")}
                    type="text"
                    name="username"
                    required
                    placeholder="Username"
                    pattern="[A-Za-z][A-Za-z0-9\\- ]*"
                    minLength={3}
                    maxLength={30}
                    title="Only letters, numbers, space or dash"
                  />
                </label>
              </label>

              {/* Photo input field */}
              <label className="label">Select a Photo</label>
              <input
                onChange={handleImageUpload}
                type="file"
                className="file-input"
                required
              />

              {/* Role */}
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
              </select>

              {/* Email */}
              <label className="floating-label my-1">
                <span>Enter your email</span>
                <label className="input validator">
                  <input
                    {...register("email")}
                    name="email"
                    type="email"
                    required
                    placeholder="mail@site.com"
                  />
                </label>
              </label>

              {/* Password */}
              <label className="floating-label">
                <span>Enter your Password</span>
                <label className="input validator relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    name="password"
                    required
                    placeholder="Password"
                    minLength={8}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                    title="Password must be at least 8 characters and include 1 uppercase, 1 lowercase, and 1 number"
                    className="w-full pr-16"
                  />
                  <button
                    type="button"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-blue-600 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEyeSlash size={20} />
                    ) : (
                      <FaEye size={20} />
                    )}
                  </button>
                </label>
              </label>

              <button
                type="submit"
                disabled={!profilePic || loading}
                className={`w-[320px] text-lg py-1 cursor-pointer rounded font-bold text-white transition ${
                  loading
                    ? "bg-indigo-400 cursor-progress"
                    : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                {loading ? "Uploading image in ImageBB..." : "Register"}
              </button>
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
              Register with Google
            </button>
            <div>
              Already have an account?{" "}
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
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
