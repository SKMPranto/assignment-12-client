import React, { useEffect, useState } from "react";
import Title from "../../../Sheared/Title/Title";
import { useForm } from "react-hook-form";
import axios from "axios";
import useAxios from "../../../Hooks/useAxios";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";
import { useNavigate } from "react-router";

const AddNewTasks = () => {
  Title("Dashboard | AddTask");
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [imageURL, setImageURL] = useState("");
  const axiosInstance = useAxios();
  const { user } = useAuth();
  const [userInfo, setUserInfo] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      axiosInstance
        .get(`/users/${user.email}`)
        .then((res) => setUserInfo(res.data))
        .catch((err) => console.error(err));
    }
  }, [user?.email, axiosInstance]);

  const onSubmit = async (data) => {
    // Calculate total payable amount
    const totalPayable = data.required_workers * data.payable_amount;

    // Check if user has enough coins
    if (totalPayable > userInfo.coins) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Not enough coins. Please purchase more coins.",
        showConfirmButton: true,
      }).then(() => {
        // navigate to purchase coin page
        navigate("/dashboard/purchaseCoin");
      });
      return; // ❌ terminate process
    }

    // If enough coins, continue
    const taskInfo = {
      email: user.email,
      task_title: data.task_title,
      task_detail: data.task_detail,
      required_workers: data.required_workers,
      payable_amount: data.payable_amount,
      completion_date: data.completion_date,
      submission_info: data.submission_info,
      photoURL: imageURL,
      created_at: new Date().toISOString(),
    };

    try {
      const taskRes = await axiosInstance.post("/tasks", taskInfo);

      if (taskRes.data.insertedId) {
        // Deduct buyer's coins
        await axiosInstance.patch(`/users/${user.email}/deduct-coins`, {
          amount: totalPayable,
        });

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Task has been added successfully",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          // 🔹 Automatic page refresh
          window.location.reload();
        });
      }
    } catch (e) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add Task. Please try again." + e.message,
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  const handleImageUpload = async (e) => {
    setLoading(true); //  start loading before upload
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append("image", image);

    const imageUploadUrl = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_IMAGE_UPLOAD_KEY
    }`;

    try {
      const res = await axios.post(imageUploadUrl, formData);
      setImageURL(res.data.data.url);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Image upload failed. Try again!", "error");
    } finally {
      setLoading(false); //  stop loading after upload success or fail
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white border-1 rounded-2xl shadow-2xl space-y-4 my-8"
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-center">
        Add New Task
      </h2>

      {/* Task Title */}
      <div>
        <label className="block font-medium">Task Title</label>
        <input
          {...register("task_title")}
          type="text"
          name="task_title"
          placeholder="Ex: Watch my YouTube video and make a comment"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Task Detail */}
      <div>
        <label className="block font-medium">Task Detail</label>
        <textarea
          {...register("task_detail")}
          name="task_detail"
          placeholder="Enter detailed task description..."
          className="textarea textarea-bordered w-full"
          required
        ></textarea>
      </div>

      {/* Required Workers */}
      <div>
        <label className="block font-medium">Required Workers</label>
        <input
          {...register("required_workers")}
          type="number"
          name="required_workers"
          placeholder="Ex: 100"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Payable Amount */}
      <div>
        <label className="block font-medium">Payable Amount</label>
        <input
          {...register("payable_amount")}
          type="number"
          name="payable_amount"
          placeholder="Ex: 10"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Completion Date */}
      <div>
        <label className="block font-medium">Completion Date</label>
        <input
          {...register("completion_date")}
          type="date"
          name="completion_date"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Submission Info */}
      <div>
        <label className="block font-medium">Submission Info</label>
        <input
          {...register("submission_info")}
          type="text"
          name="submission_info"
          placeholder="Ex: Screenshot / Proof"
          className="input input-bordered w-full"
          required
        />
      </div>

      {/* Task Image URL */}
      <div>
        <label className="block font-medium">Task Image URL</label>
        <input
          onChange={handleImageUpload}
          type="file"
          className="file-input w-full"
          required
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!imageURL || loading}
        className={`w-full text-2xl py-1 cursor-pointer rounded-lg font-bold text-white transition ${
          loading
            ? "bg-indigo-400 cursor-progress"
            : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Uploading image in ImageBB..." : "Add Task"}
      </button>
    </form>
  );
};

export default AddNewTasks;
