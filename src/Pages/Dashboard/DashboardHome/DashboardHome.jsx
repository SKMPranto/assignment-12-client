import React from 'react';
import BuyerHome from '../BuyerHome/BuyerHome';
import WorkerHome from '../WorkerDashboard/WorkerHome/WorkerHome';

const DashboardHome = () => {
    return (
        <div>
            <BuyerHome></BuyerHome>
            <WorkerHome></WorkerHome>
        </div>
    );
};

export default DashboardHome;