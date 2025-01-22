import React, { useState  , useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { useFormik } from 'formik'
import { updateApplication } from '../redux/slices/demoSlice'
import axiosInstace from '../axios/axios'

const EditJobApplication = () => {
    const {id} = useParams()
    const user =  useSelector((state)=> state.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [application,setApplication] = useState()

    const fetchApplication = async()=>{
        try {
            const {data} =  await axiosInstace.get("/api/applications/findOne",{
                params:{id},
                headers: { authorization: `Bearer ${user?.token}` },
            })
            console.log(data);
            setApplication(data)
        } catch (error) {
            
        }
    }

    // const formatDateForInput = (date) => {
    //     const d = new Date(date);
    //     const year = d.getFullYear();
    //     const month = String(d.getMonth() + 1).padStart(2, '0');
    //     const day = String(d.getDate()).padStart(2, '0');
    //     console.log(`${year}-${month}-${day}`);
    //     return `${year}-${month}-${day}`;
    //   };

    const { handleChange, handleSubmit } = useFormik({
        initialValues: {
          position:application?.position,
          date: "",
          company:application?.company,
        },
        enableReinitialize: true,
    
        onSubmit: async (values) => {
          try {
            console.log(values);
            const {data} = await axiosInstace.post(
              "/api/applications/edit",
               {id,application:values} ,
              {
                headers: { authorization: `Bearer ${user?.token}` },
              }
            );
            dispatch(updateApplication({data}))
            navigate("/")
          } catch (error) {
            console.log(error.message);
          }
        },
      });

    useEffect(()=>{
        if(user?.token){
            fetchApplication()
        }
    },[user])
    console.log(id);
  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      {/* <img
        alt="Your Company"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
        className="mx-auto h-10 w-auto"
      /> */}
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Add Job Application
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        onSubmit={handleSubmit}
        action="#"
        method="POST"
        className="space-y-6"
      >
        <div>
          <label
            htmlFor="position"
            className="block text-sm/6 font-medium text-gray-900"
          >
            position
          </label>
          <div className="mt-2">
            <input
              id="position"
              name="position"
              type="text"
              defaultValue={application?.position}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="date"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Applied Date
          </label>
          <div className="mt-2">
            <input
              id="date"
              name="date"
              type="date"
            //   defaultValue={}
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            ></input>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="company"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Company
            </label>
          </div>
          <div className="mt-2">
            <input
              id="company"
              name="company"
              defaultValue={application?.company}
              type="text"
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="status"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Status
            </label>
          </div>
          <div className="mt-2">
            <input
              id="status"
              name="status"
              defaultValue={application?.status}
              type="text"
              onChange={handleChange}
              required
              className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default EditJobApplication
