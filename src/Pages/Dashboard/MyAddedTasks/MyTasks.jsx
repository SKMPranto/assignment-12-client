import React, { Suspense, useEffect, useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import Title from "../../../Sheared/Title/Title";
import Loader from "../../../Sheared/LoaderEffect/Loader";
import MyAddedTasks from "./MyAddedTasks";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MyTasks = () => {
  Title("Dashboard | My Tasks");
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/tasks/${user.email}`)
        .then((res) => setTasks(res.data))
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [user, axiosSecure]);

  if (loading) return <Loader />;

  return (
    <div>
      <Suspense fallback={<Loader></Loader>}>
        <MyAddedTasks tasks={tasks} setTasks={setTasks}></MyAddedTasks>
      </Suspense>
    </div>
  );
};

export default MyTasks;
