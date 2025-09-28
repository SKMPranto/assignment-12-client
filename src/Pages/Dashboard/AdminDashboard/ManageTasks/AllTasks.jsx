import React from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const AllTasks = ({ tasks, setTasks }) => {
  const axiosSecure = useAxiosSecure();
  //  Remove task from UI
  const handleDeleteFromList = (id) => {
    setTasks((prev) => prev.filter((task) => task._id !== id));
  };

  // Delete task with SweetAlert2 + Axios
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
                swalWithBootstrapButtons
                  .fire({
                    title: "Deleted!",
                    text: "Your task has been deleted.",
                    icon: "success",
                    confirmButtonText: "OK",
                  })
                  .then(() => {
                    handleDeleteFromList(id);
                    window.location.reload();
                  });
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
  if (tasks.length === 0) {
    return (
      <h2 className="text-3xl font-semibold text-center mt-10">
        No Tasks Available
      </h2>
    );
  }
  return (
    <div>
      <h1 x>
        All Tasks
      </h1>

      {/*  Table Format */}
      <div className="overflow-x-auto mt-10 mb-10">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
                <th></th>
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
            {tasks.map((task ,index) => (
              <tr key={task._id}>
                <td>{index + 1}</td>
                <td>{task.task_title}</td>
                <td>{task.task_detail}</td>
                <td>{task.required_workers}</td>
                <td>{task.payable_amount}</td>
                <td>{new Date(task.completion_date).toLocaleDateString()}</td>
                <td>{task.submission_info}</td>
                <td className="flex gap-2">
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
export default AllTasks;
