import React, { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axiosInstace from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addApplication,
  deleteApplication,
  replaceApplications,
} from "../redux/slices/demoSlice";

const Home = () => {
 
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const application = useSelector((state) => state.application);
  const [totalPages,setTotalPages] = useState()
  const limit = 2

  const handleEdit = (id) => {
    navigate(`edit/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstace.get("/api/applications/delete", {
        params: { id },
        headers: { authorization: `Bearer ${user?.token}` },
      });
    //   dispatch(deleteApplication({ id }));
    fetchApplications()
      console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleFilterByStatus = async (e) => {
    try {
      const status = e.target.value;
       status === "all" ? fetchApplications() : ""
      const { data } = await axiosInstace.get("/api/applications/filter", {
        params: { status,page },
        headers: { authorization: `Bearer ${user?.token}` },
      });
      console.log(data);
      dispatch(replaceApplications(data));
    } catch (error) {
      console.log(error.message);
    }
  };

//   const handlePageChange = async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
//   }

  const fetchApplications = async () => {
    try {
      const { data } = await axiosInstace.get("/api/applications", {
        params:{page},
        headers: { authorization: `Bearer ${user?.token}` },
      });
      setLoading(false);
      dispatch(replaceApplications(data.applications));
      const noOfbuttons = Math.ceil(data.totalCount /  limit)
      console.log(noOfbuttons);
      setTotalPages(noOfbuttons)
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchApplications();
    }
  }, [user,page]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="p-4">
      {/* <h2 className="">applications</h2> */}
      <div>
        <h2 className="text-md font-md mb-1 ">Filter by Status</h2>
        <select onChange={handleFilterByStatus} className="p-2 rounded-md">
          <option name="all" value="all">
            All
          </option>
          <option name="pending" value="pending">
            Pending
          </option>
          <option name="viewed" value="viewed">
            Viewed
          </option>
          <option name="rejected" value="rejected">
            Rejected
          </option>
          <option name="interviewed" value="interviewed">
            Interviewd
          </option>
        </select>
      </div>
      <div className="flex flex-wrap gap-3">
        {application && application.length
          ? application.map((a, i) => {
              return (
                <div key={a._id} className="card bg-base-100 w-96 shadow-xl">
                  <div className="card-body">
                    <h2 className="card-title">{a.position}</h2>
                    <p>{a.company}</p>
                    <p>{new Date(a.date).toDateString()}</p>
                    <div className="card-actions justify-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleEdit(a._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn bg-red-500  text-white"
                        onClick={() => handleDelete(a._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
      </div>
      <div className="join absolute bottom-[40px] left-[50%] flex justify-center mt-5">
      { Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setPage(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg border ${
              page === index + 1
                ? 'bg-black text-white'
                : 'bg-gray-200 text-gray-600'
            }`}
          >
            {index + 1}
          </button>
        ))}
        {/* <button className="join-item btn active:btn-active">1</button>
        <button className="join-item btn">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button> */}
      </div>
    </div>
  );
};

export default Home;
