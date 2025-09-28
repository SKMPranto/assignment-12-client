import React, { Suspense, useEffect, useState } from 'react';
import Title from '../../../../Sheared/Title/Title';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import Loader from '../../../../Sheared/LoaderEffect/Loader';
import AllUser from './AllUser';

const ManageUsers = () => {
    Title("Dashboard | Manage Users");
    const [user, setUser] = useState([])
    const [loading, setLoading] = useState(true);
    const axiosSecure = useAxiosSecure()
    useEffect(()=>{
        setLoading(true);
        axiosSecure.get("users").then((res)=>{
            setUser(res.data);
        }).catch((err)=>console.error(err))
        .finally(()=>setLoading(false));
    }, [axiosSecure])
    return (
        <div>
            <Suspense fallback={<Loader></Loader>} >
            <AllUser user={user} setUser={setUser}></AllUser>
            </Suspense>
        </div>
    );
};

export default ManageUsers;