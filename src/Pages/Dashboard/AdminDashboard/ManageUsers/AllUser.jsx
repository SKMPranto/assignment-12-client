import React from "react";
import { MdDeleteForever } from "react-icons/md";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const AllUser = ({ user, setUser }) => {
  const axiosSecure = useAxiosSecure();

  // Remove user from UI
  const handleDeleteFromList = (email) => {
    setUser((prev) => prev.filter((usr) => usr.email !== email));
  };

  // Delete user with SweetAlert2 + Axios
  const handleDelete = (email) => {
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
            .delete(`/users/${email}`)
            .then((res) => {
              if (res.data.deletedCount) {
                swalWithBootstrapButtons
                  .fire({
                    title: "Deleted!",
                    text: "User has been deleted.",
                    icon: "success",
                    confirmButtonText: "OK",
                  })
                  .then(() => {
                    handleDeleteFromList(email);
                  });
              }
            })
            .catch(() => {
              Swal.fire("Error", "Failed to delete user", "error");
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your user is safe 🙂",
            icon: "info",
            confirmButtonText: "OK",
          });
        }
      });
  };

  // ✅ Update Role
  const handleUpdateRole = (email, currentRole) => {
    Swal.fire({
      title: "Update Role",
      input: "select",
      inputOptions: {
        Admin: "Admin",
        Buyer: "Buyer",
        Worker: "Worker",
      },
      inputValue: currentRole,
      showCancelButton: true,
      confirmButtonText: "Update",
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) {
          return "You need to select a role!";
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const newRole = result.value;
        axiosSecure
          .patch(`/users/${email}/role`, { role: newRole })
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              Swal.fire("Updated!", `Role changed to ${newRole}`, "success");
              // Update role in UI without reload
              setUser((prev) =>
                prev.map((usr) =>
                  usr.email === email ? { ...usr, role: newRole } : usr
                )
              );
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to update role", "error");
          });
      }
    });
  };

  if (user.length === 0) {
    return (
      <h2 className="text-3xl font-semibold text-center mt-10">
        No Users Available
      </h2>
    );
  }

  return (
    <div className="overflow-x-auto">
      <h1 className="text-3xl font-semibold text-center mt-10">All Users</h1>
      <table className="table table-zebra w-full mb-10">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name & Email </th>
            <th>Coins</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.map((usr, index) => (
            <tr key={usr.email}>
              <td>{index + 1}</td>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img src={usr?.photoURL} alt={usr?.name} />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">{usr?.name}</div>
                    <div className="text-sm opacity-50">{usr?.email}</div>
                  </div>
                </div>
              </td>
              <td>{usr?.coins ? usr?.coins : 0}</td>
              <td>
                <div className="badge badge-info">{usr?.role}</div>
              </td>
              <td className="flex gap-2">
                <button
                  onClick={() => handleUpdateRole(usr.email, usr.role)}
                  className="btn btn-sm btn-primary rounded font-bold"
                >
                  Update Role
                </button>
                <button
                  onClick={() => handleDelete(usr.email)}
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
  );
};

export default AllUser;
