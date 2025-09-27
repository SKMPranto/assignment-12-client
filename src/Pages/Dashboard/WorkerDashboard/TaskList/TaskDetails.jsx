import React from "react";
import { Link, useParams } from "react-router";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Title from "../../../../Sheared/Title/Title";
import Loader from "../../../../Sheared/LoaderEffect/Loader";
import { useForm } from "react-hook-form";
import useAuth from "../../../../Hooks/useAuth";
import Swal from "sweetalert2";

const TaskDetails = () => {
  Title("Dashboard | Task Details");
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isPending, data: TaskDetails = [] } = useQuery({
    queryKey: ["taskDetails", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tasks/task/${id}`).then().catch();
      return res.data;
    },
  });
  if (isPending) return <Loader></Loader>;

  const onSubmit = (data) => {
    // console.log(data.submission_info);
    const submissionData = {
      task_id: TaskDetails._id,
      task_title: TaskDetails.task_title,
      payable_amount: TaskDetails.payable_amount,
      worker_name: user.displayName,
      worker_email: user.email,
      submission_info: data.submission_info,
      buyer_email: TaskDetails.email,
      submitted_at: new Date().toISOString(),
      status: "pending",
      total_earning:0,
    };

    axiosSecure
      .post("/submit-task", submissionData)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title:"You have already submitted this task or something went wrong: " + err.message,
          showConfirmButton: true,
        });
      });
  };

  return (
    <div>
      <div className="mx-auto my-5">
        <h1 className="text-3xl md:text-5xl lg:text-6xl text-center font-bold my-5">
          Your task Details
        </h1>
        <div className="card bg-base-300 shadow-lg border-1 md:w-[85%] lg:w-[95%] 2xl:w-[70%] mx-auto  p-5">
          <div className=" lg:flex items-center justify-center">
            <figure>
              <img
                src={TaskDetails.photoURL}
                alt={TaskDetails.task_title}
                className="w-96 h-full object-fit rounded-lg"
              />
            </figure>
            <div className="card-body md:text-lg">
              <h2 className="card-title md:text-2xl">
                {TaskDetails.task_title}
              </h2>
              <p>
                <strong>Buyer Email :</strong> {TaskDetails.email}$
              </p>
              <p>
                <strong>Payable Amount :</strong> {TaskDetails.payable_amount}$
              </p>
              <p>
                <strong>Required Workers :</strong>{" "}
                <span>{TaskDetails.required_workers} </span>
              </p>
              <p>
                <strong>Submission Info :</strong> {TaskDetails.submission_info}
              </p>
              <p>
                <strong> Completion Date :</strong>{" "}
                {TaskDetails.completion_date}
              </p>
            </div>
          </div>
          <p className=" mt-4">
            <strong className="text-xl text-red-500">
              Description : <br />
            </strong>{" "}
            {TaskDetails.task_detail}
          </p>
        </div>
      </div>
      <h1 className="text-center text-lg md:text-2xl lg:text-3xl font-bold mt-15">
        Complete the task and give a valid recommended submission information or
        prove
      </h1>
      <div className="md:w-[50%] mx-auto my-5">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col justify-end"
        >
          <label className="floating-label">
            <span>Give a Submission Info or Prove</span>
            <textarea
              {...register("submission_info")}
              placeholder="Give a Submission Info or Prove"
              className="textarea textarea-info w-full"
              required
            ></textarea>
          </label>
          <button
            type="submit"
            className="btn btn-outline btn-success text-xl lg:text-2xl font-bold mt-2"
          >
            Submit Your Submission
          </button>
        </form>
      </div>
      <div className="flex justify-center my-20">
        <Link
          to="/dashboard/tasklist"
          className="btn btn-wide btn-success text-xl lg:text-2xl font-bold rounded-4xl p-7"
        >
          Task List
        </Link>
      </div>
    </div>
  );
};

export default TaskDetails;
