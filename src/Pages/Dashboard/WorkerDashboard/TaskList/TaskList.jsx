import React from "react";
import Title from "../../../../Sheared/Title/Title";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../../Sheared/LoaderEffect/Loader";
import TaskCard from "./TaskCard";

const TaskList = () => {
  Title("Dashboard || Task List");
  const axiosSecure = useAxiosSecure();
  const { isPending, data: Tasks = [] } = useQuery({
    queryKey: ["all-tasks"],
    queryFn: async () => {
      const res = await axiosSecure.get("/tasks").then().catch();
      return res.data;
    },
  });
  if (isPending) return <Loader></Loader>;
  return <TaskCard tasks={Tasks}></TaskCard>;
};

export default TaskList;
