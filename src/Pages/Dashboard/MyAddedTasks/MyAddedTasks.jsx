import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxios from "../../../Hooks/useAxios";
import { NavLink } from "react-router";

const MyAddedTasks = ({ tasks, setTasks }) => {
  const axiosInstance = useAxios();

  if (!tasks || tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
        <h2 className="text-lg md:text-4xl lg:text-5xl font-bold text-red-300">
          You haven’t added any Tasks yet.
        </h2>
        <p className="text-gray-400 md:text-2xl">
          Start contributing by adding your first Task !
        </p>
        <NavLink
          to="/dashboard/addNewTasks"
          className="btn btn-outline btn-info md:text-2xl font-bold rounded"
        >
          Add task
        </NavLink>
      </div>
    );
  }

  // ✅ Remove task from UI
  const handleDeleteFromList = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // ✅ Delete task with SweetAlert2 + Axios
  const handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success text-white",
        cancelButton: "btn btn-error text-white",
        actions: "flex justify-between gap-x-7", // Add spacing between buttons
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
        focusCancel: true, // Makes cancel focused by default
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosInstance
            .delete(`/tasks/${id}`)
            .then((res) => {
              if (res.data.deletedCount) {
                swalWithBootstrapButtons.fire({
                  title: "Deleted!",
                  text: "Your task has been deleted.",
                  icon: "success",
                  confirmButtonText: "OK",
                });
                handleDeleteFromList(id);
                // ✅ Refresh the page
                window.location.reload();
              }
            })
            .catch(() => {
              Swal.fire("Error", "Failed to delete task", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your task is safe 🙂",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-gray-400 font-bold text-center mt-10">
        My Added Tasks
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10 mb-10 justify-items-center">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="card w-40 md:w-40 2xl:w-100 shadow-lg rounded-lg shadow-gray-500 border-1"
          >
            <figure>
              <img
                src={task.photoURL}
                alt={task.task_title}
                className="h-62 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{task.task_title}</h2>
              <p className="text-gray-500">{task.task_detail}</p>
              <p>
                <strong>Required Workers:</strong> {task.required_workers}
              </p>
              <p>
                <strong>Payable Amount:</strong> {task.payable_amount}{" "}
                <strong>$</strong>
              </p>
              <p>
                <strong>Completion Date:</strong>{" "}
                {new Date(task.completion_date).toLocaleDateString()}
              </p>
              <p>
                <strong>Submission Info:</strong> {task.submission_info}
              </p>

              {/* Action buttons */}
              <div className="join join-vertical lg:join-horizontal gap-x-15 mt-4">
                <NavLink
                  to={`/dashboard/updateTask/${task._id}`}
                  className="btn join-item btn-outline  btn-warning md:text-lg rounded md:font-extrabold"
                >
                  Update Task <FaEdit />
                </NavLink>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="btn join-item btn-outline  btn-error md:text-lg rounded md:font-extrabold"
                >
                  Delete <MdDeleteForever />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAddedTasks;
