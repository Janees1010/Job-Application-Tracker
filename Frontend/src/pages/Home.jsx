import React, { useCallback, useEffect, useState } from "react";
import Loader from "../components/Loader";
import axiosInstace from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addApplication,deleteApplication } from "../redux/slices/demoSlice";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const navigate  = useNavigate()
  const dispatch =useDispatch()
  const [applications, setApplications] = useState();
  const user = useSelector((state)=> state.user)
  const application = useSelector((state) => state.application)
  
   
  const handleEdit = (id)=>{
     navigate(`edit/${id}`)
  }

  const handleDelete = async(id)=>{
    try {
        const response = await axiosInstace.get(
            "/api/applications/delete",
            {
              params:{id},
              headers: { authorization: `Bearer ${user?.token}` },
            }
          );
          dispatch(deleteApplication({id}))
          console.log(response);  
    } catch (error) {
         console.log(error.message);
    }
  }

  const fetchApplications =  async()=> {
    try {
      const { data } = await axiosInstace.get("/api/applications", {
        headers: { authorization: `Bearer ${user?.token}` },
      });
      console.log(data);
      setLoading(false);
    //   dispatch(addApplication({data}))
      setApplications(data);
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
  };  


  useEffect(() => {
      if(user?.token){
          fetchApplications();
        }
    }, [user]);

    if (loading) {
      return <Loader />;
    }

  return (
    <div className="p-2 gap-2 flex flex-wrap ">
      {/* <h2 className="">applications</h2> */}
      {applications && applications.length
        ? applications.map((a, i) => {
            return (
              <div key={a._id} className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{a.position}</h2>
                  <p>{a.company}</p>
                  <p>{ new Date(a.date).toDateString()}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary" onClick={() => handleEdit(a._id)}>Edit</button>
                    <button className="btn bg-red-500  text-white" onClick={()=> handleDelete(a._id)}>Delete</button>
                  </div>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default Home;
