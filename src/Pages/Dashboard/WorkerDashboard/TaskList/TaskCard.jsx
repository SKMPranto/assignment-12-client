import React from "react";
import { NavLink, useNavigate } from "react-router";

const TaskCard = ({ tasks }) => {
  //  Filter only tasks where required_workers > 0
  const availableTasks = tasks.filter((task) => task.required_workers > 0);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Total Tasks: {availableTasks.length}
      </h2>

      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 my-10 justify-items-center">
        {availableTasks.map((task) => (
          <div
            key={task._id}
            className="card bg-base-100 md:w-[350px] 2xl:w-96 shadow-2xl border-1"
          >
            <figure>
              <img
                className="w-full h-56 object-fit"
                src={task.photoURL}
                alt={task.task_title}
              />
            </figure>
            <div className="card-body">
              <h1 className="card-title">{task.task_title}</h1>
              <h3 className="badge badge-outline badge-soft badge-info h-12 md:h-6">
                Buyer Email : {task.email}
              </h3>
              <h3 className="badge badge-outline badge-soft badge-info">
                Completion Date : {task.completion_date}
              </h3>
              <h3 className="badge badge-outline badge-soft badge-info">
                Payable Amount : {task.payable_amount} $
              </h3>
              <h3 className="badge badge-outline badge-soft badge-info">
                Required Workers : {task.required_workers}
              </h3>
              <div className="card-actions justify-center">
                <NavLink
                  to={`/dashboard/taskDetails/${task._id}`}
                  className="btn btn-wide btn-primary"
                >
                  View Details
                </NavLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskCard;
