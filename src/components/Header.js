import React, { useState } from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { BsCartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { logoutRedux } from "../redux/userSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const hideMenu =() =>{
    setShowMenu(false);
  };

  const handleLogout = () => {
    dispatch(logoutRedux());
    toast("Logged out successfully");
    navigate("/");
  };
  const cartItemNumber = useSelector((state)=>state.product.cartItem);

  return (
    <header className="fixed shadow-md w-full h-16 px-2 md:px-4 z-50 bg-white ">
      {/* desktop */}
      <div className="flex items-center h-full justify-between">
        <Link to={""}>
          <div className="h-10">
            <img src={logo} className="h-full" />
          </div>
        </Link>
        <div className="flex items-center gap-4 md:gap-7">
          <nav className="gap-4 md:gap-6 text-base md:text-lg hidden md:flex">
            <Link to={""}>Home</Link>
            {/* <Link to={"menu/64622b48a6167f37e642d8b8"}>Menu</Link> */}
            <Link to={"menu/64622b48a6167f37e642d8b1"}>Menu</Link>
            <Link to={"about"}>About</Link>
            <Link to={"contact"}>Contact</Link>
          </nav>
          <div className="text-2xl text-slate-600 relative cursor-pointer">           
            <Link to={"cart"}>
              <BsCartFill />
              <div className="absolute -top-1 -right-1 text-white bg-red-500 h-4 w-4 rounded-md m-0 p-0 text-xs text-center  ">
                {cartItemNumber.length}
              </div>
            </Link>
          </div>
          <div className="text-slate-600" onClick={handleShowMenu}>
            <div className="text-3xl cursor-pointer w-8 h-8 rounded-full overflow-hidden drop-shadow-md">
            {userData.image ? (
                <img src={userData.image} className="h-full w-full" />
              ) : (
                <FaUserCircle />
              )}              
            </div>
            {showMenu && (
              <div className="absolute right-2 bg-slate-200 py-2  shadow drop-shadow-md flex flex-col min-w-[120px] text-center" onMouseLeave={hideMenu}>
                {userData.email === process.env.REACT_APP_ADMIN_EMAIL && (
                  <Link
                    to={"newproduct"}
                    className="whitespace-nowrap cursor-pointer px-2  hover:bg-slate-300"
                  >
                    New product
                  </Link>
                )}                
                {userData.firstName ? (
                  <p
                    className="cursor-pointer text-white px-2 bg-slate-400 hover:bg-slate-300"
                    onClick={handleLogout}
                  >
                    Logout ({userData.firstName}){" "}
                  </p>
                ) : (
                  <Link
                    to={"login"}
                    className="whitespace-nowrap cursor-pointer px-2  hover:bg-slate-300"
                  >
                    Login
                  </Link>
                )}
                 <nav className="text-base md:text-lg flex flex-col md:hidden">
                  <Link to={""} className="px-2 py-1  hover:bg-slate-300">
                    Home
                  </Link>
                  <Link
                    to={"menu/64622b48a6167f37e642d8b8"}
                    className="px-2 py-1  hover:bg-slate-300"
                  >
                    Menu
                  </Link>
                  <Link to={"about"} className="px-2 py-1  hover:bg-slate-300">
                    About
                  </Link>
                  <Link to={"contact"} className="px-2 py-1  hover:bg-slate-300">
                    Contact
                  </Link>
                </nav>              
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
