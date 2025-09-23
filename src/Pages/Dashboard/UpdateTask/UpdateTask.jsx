import React, { useEffect, useState } from "react";
import Title from "../../../Sheared/Title/Title";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import useAxios from "../../../Hooks/useAxios";
import Loader from "../../../Sheared/LoaderEffect/Loader";
import Swal from "sweetalert2";

const UpdateTask = () => {
  Title("Dashboard | UpdateTask");
  const { id } = useParams();
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue } = useForm();
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/tasks/task/${id}`)
        .then((res) => {
          setTask(res.data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id, axiosInstance]);

  // ✅ Set form values when task is loaded
  useEffect(() => {
    if (task) {
      setValue("task_title", task.task_title);
      setValue("task_detail", task.task_detail);
      setValue("required_workers", task.required_workers);
      setValue("payable_amount", task.payable_amount);
      setValue("completion_date", task.completion_date?.slice(0, 10)); // YYYY-MM-DD
      setValue("submission_info", task.submission_info);
    }
  }, [task, setValue]);

  const onSubmit = async (data) => {
    const task = {
      task_title: data.task_title,
      task_detail: data.task_detail,
      completion_date: data.completion_date,
      submission_info: data.submission_info,
    };
    await axiosInstance.put(`/tasks/${id}`, task).then((res) => {
      if (res.data.modifiedCount) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Your Task has been update successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "info",
          title: "No changes made to the Artifact",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };
  if (loading) return <Loader></Loader>;
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

      {/* Submit Button */}
      <button type="submit" className="btn btn-primary w-full">
        Update Task
      </button>
    </form>
  );
};

export default UpdateTask;
