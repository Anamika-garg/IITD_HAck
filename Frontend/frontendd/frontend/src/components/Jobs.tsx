import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../Context/AuthContext";

const Jobs = () => {
    const navigate = useNavigate();
    const [myData, setMyData] = useState([]);
    const [loading,setLoading] = useState(false);
    const [formData, setFormData] = useState({
        jobTitle: "",
        location: ""
    });
    const [show, setShow] = useState(true);

    // const { isAuthenticated } = useAuth();

    // useEffect(() => {
    //     if (!(localStorage.getItem('authToken'))) {
    //         setShow(false);
    //     }
    // }, []); 

    useEffect(() => {
        fetchDetails();
    }, []);

    async function fetchDetails() {
        try {
            const res = await axios.get(
                `${import.meta.env.VITE_BACKEND_JOB_URL}/jobsInterestedIn`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization : `Bearer ${localStorage.getItem('authToken')}`
                    }
                }
            );
            console.log("Jobs Data:", res.data);
            setMyData(res.data.jobs);
        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    }

    const findJob = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const res = await axios.post(
                `${import.meta.env.VITE_BACKEND_JOB_URL}/jobs`,
                {
                    jobTitle: formData.jobTitle,
                    location: formData.location
                },
                {
                    headers: {
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("Search Results:", res.data);
            navigate("/findJobs", { state: res.data });
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.error("Error searching jobs:", err);
        }
    };

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="bg-white text-gray-800 font-sans ">
            {/* Hero Section */}
            <header className="text-center bg-white py-16 mt-[70px] px-4 sm:px-8 md:px-16 lg:px-32">
                <h2 className="text-3xl sm:text-4xl font-bold text-purple-700">
                    Get Your Desired Job!
                </h2>
                <p className="text-gray-600 mt-4 text-sm sm:text-base">
                    Find Jobs, Employment & Career Opportunities
                </p>
                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                    <input
                        type="text"
                        placeholder="Job Title"
                        className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={changeHandler}
                    />
                    <input
                        type="text"
                        placeholder="City or State"
                        className="border border-gray-300 p-3 w-full sm:w-1/3 rounded-md"
                        name="location"
                        value={formData.location}
                        onChange={changeHandler}
                    />
                    <button
                        className="bg-purple-700 text-white px-6 py-3 rounded-md hover:bg-white-800 w-full sm:w-auto"
                        onClick={findJob}
                    >
                        {
                            (!loading) ?  `Find a Job` : `Loading...`
                        }
                       
                    </button>
                </div>
                <p className="mt-4 text-gray-500 text-xs sm:text-sm">
                    Trending Keywords: Automotive, Education, Health & Care, Engineering
                </p>
            </header>

            {/* Jobs Section */}
            <section className="bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-32">
                {/* <h3 className="text-center text-2xl sm:text-3xl font-bold text-purple-700">
                    Jobs You May Be Interested In
                </h3> */}

                {show ? (
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {myData
                            .filter(
                                (job) =>
                                    (!job.company.includes("****")) &&
                                    job.location !== "*******" &&
                                    job.title !== "******** ********"
                            )
                            .slice(0, 6)
                            .map((job, index) => (
                                <div
                                    key={index}
                                    className="p-6 border border-gray-200 rounded-md bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
                                >
                                    <h4 className="text-lg font-semibold text-purple-700">
                                        {job.title}
                                    </h4>
                                    <p className="text-gray-600 mt-1">{job.company}</p>
                                    <p className="text-gray-500 text-sm mt-1">{job.location}</p>
                                    <a
                                        href={job.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        View Job Posting
                                    </a>
                                </div>
                            ))}
                    </div>
                ) : (
                    <h1 className="text-center mt-3 text-red-500 font-semibold">
                        Login first...
                    </h1>
                )}
            </section>
        </div>
    );
};

export default Jobs;
