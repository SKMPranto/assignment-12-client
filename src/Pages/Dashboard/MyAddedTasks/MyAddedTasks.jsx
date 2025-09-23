import React from "react";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { NavLink } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyAddedTasks = ({ tasks, setTasks }) => {
  const axiosSecure = useAxiosSecure();

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
        actions: "flex justify-between gap-x-7",
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
        focusCancel: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          axiosSecure
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

  // ✅ Sort tasks by completion_date descending
  const sortedTasks = [...tasks].sort(
    (a, b) => new Date(b.completion_date) - new Date(a.completion_date)
  );

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

  return (
    <div>
      <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-red-400 font-bold text-center mt-10">
        My Added Tasks
      </h1>

      {/* ✅ Table Format */}
      <div className="overflow-x-auto mt-10 mb-10">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Detail</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Completion Date</th>
              <th>Submission Info</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map((task) => (
              <tr key={task._id}>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <td>{task.required_workers}</td>
                <td>{task.payable_amount}</td>
                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                <td>{task.submission_info}</td>
                <td className="flex gap-2">
                  <NavLink
                    to={`/dashboard/updateTask/${task._id}`}
                    className="btn btn-sm btn-warning rounded font-bold flex items-center gap-1"
                  >
                    <FaEdit /> Update
                  </NavLink>
                  <button
                    onClick={() => handleDelete(task._id)}
                    className="btn btn-sm btn-error rounded font-bold flex items-center gap-1"
                  >
                    <MdDeleteForever /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAddedTasks;
