import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useLocation } from "react-router-dom";

export default function FindJobs() {
  const [data, setData] = useState([]);
  const { state } = useLocation();
  console.log("data" , state);
  // console.log(state);

  useEffect(() => {
    if (state) {
      setData(state);
      console.log("data" , data);
    }
  }, [state]);

  // Filter out jobs with missing or placeholder values
  const filteredJobs = data.filter(
    (job) =>
      job.company &&
      job.title &&
      job.location
  );

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-[70px]">
      <h2 className="text-2xl font-semibold text-center mb-6 text-purple-700">
        Job Listings
      </h2>
      <div className="grid grid-cols-1 w-[80%] mx-auto sm:grid-cols-2 lg:grid-cols-3">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job, index) => <JobCard jobData={job} key={index} />)
        ) : (
          <p className="text-center col-span-full">No jobs available.</p>
        )}
      </div>
    </div>
  );
}
