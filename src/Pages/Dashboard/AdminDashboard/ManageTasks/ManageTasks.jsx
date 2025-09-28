import React, { Suspense, useEffect, useState } from 'react';
import Title from '../../../../Sheared/Title/Title';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loader from '../../../../Sheared/LoaderEffect/Loader';
import AllTasks from './AllTasks';

const ManageTasks = () => {
    Title("Dashboard | Manage Tasks");
    const axiosSecure = useAxiosSecure();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(()=>{
        setLoading(true);
        axiosSecure.get("tasks").then((res)=>{
            setTasks(res.data);
        }).catch((err)=>console.error(err))
        .finally(()=>setLoading(false));
    }, [axiosSecure])
    return (
        <div>
            <Suspense fallback={<Loader></Loader>}>
            <AllTasks tasks={tasks} setTasks={setTasks}></AllTasks>
            </Suspense>
        </div>
    );
};

export default ManageTasks;