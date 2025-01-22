import {useEffect,useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { addUser } from "../redux/slices/userSlice";

const Navbar = () => {
    const user = useSelector((state)=>state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [showUserDropdown, setShowDropDown] = useState(false);

    
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
          navigate("/login");
        }
        console.log(JSON.parse(user), "user");
        dispatch(addUser(JSON.parse(user)));
      }, []);
  return (
    <>
    <div>

      <nav className="bg-blue-950 flex justify-between items-center p-3 px-5 h-[60px]  w-full">
        <div>
          <h1 className="text-xl text-white">Job Portal</h1>
        </div>

        <div className="relative flex gap-5">
            <Link to="/add" className="btn-md text-center pt-3  bg-white  rounded-md ">
                Add Job Application
            </Link>
          <button
            className="w-10 text-white text-xl  h-10 rounded-full bg-slate-500"
            onClick={() => setShowDropDown((pre) => !pre)}
          >
            {user.username ? user.username.slice(0, 1) : ""}
          </button>
          {showUserDropdown ? (
            <div className="absolute right-0  top-[70px] w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
              <div>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  {user?.username}
                </a>
              </div>
              <hr />
              <div onClick={logout}>
                <button
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:outline-none"
                >
                  Sign out
                </button>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </nav>
      <Outlet />
    </div>
    </>
  );
};

export default Navbar;
