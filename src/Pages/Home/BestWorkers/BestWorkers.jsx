import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loader from "../../../Sheared/LoaderEffect/Loader";

const BestWorkers = () => {
  const axiosSecure = useAxiosSecure();
  const { isPending, data: BestWorkers = [] } = useQuery({
    queryKey: ["best_workers"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });
  if (isPending) return <Loader></Loader>;
  // filter only workers
  const topWorkers = BestWorkers.filter((worker) => worker.role === "Worker");

  // sort by coins descending (highest first)
  const sortedWorkers = topWorkers.sort((a, b) => b.coins - a.coins);

  // pick top 6 workers
  const bestSixWorkers = sortedWorkers.slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl 2xl:text-4xl text-red-400 font-bold text-center mt-10">
        Best Workers
      </h1>
      <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3 my-10 justify-items-center">
        {bestSixWorkers.map((worker) => (
          <div key={worker._id} className="card bg-base-100 w-96 shadow-sm">
            <figure>
              <img
                className="w-full h-56 object-fit"
                src={worker.photoURL}
                alt={worker.username}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {worker.username} <br /> {worker.email}
              </h2>
              <p>
                <span className="font-bold">Coins:</span>{" "}
                {worker.coins ? worker.coins : 0}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
