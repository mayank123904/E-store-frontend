
import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast';
// import { Link } from 'react-router-dom';
import "./navbar.css"
// import Sidebar from '../../Sidebar/sidebar';
import Sidepanel from '../../Sidebar/sidebar';
import { Context,server } from '../../../main';
import axios from 'axios';
import { HiOutlineUser } from 'react-icons/hi';
import { IoCartOutline } from 'react-icons/io5';
import {PiSignOutBold} from 'react-icons/pi';
import {FaLocationDot} from'react-icons/fa6';
import Popup from '../../Setlocation/setlocation';
import Categories from '../../Categories/categories';
function Nav() {
  const location = useLocation();
  const {isAuthenticated,setIsAuthenticated,loading,setLoading,userMobile} = useContext(Context);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showLocation, setShowLocation] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleLocation = () => {
    setShowLocation(!showLocation);
  };
  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const togglecategoryDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const logoutHandler=async() =>{
   setLoading(true);
   setShowDropdown(!showDropdown);
   try {
    const {data} = await axios.get(`${server}/users/logout`
      ,{  withCredentials:true, }
     );
     toast.success("Logged Out Successfully");
     setIsAuthenticated(false);
     setLoading(false);
   } catch (error) {
    toast.error(error.response.data.message);
      setIsAuthenticated(true);
      setLoading(false);
   }
};


  return (
    <>
    <div className="topcont">
      <div className="side">
      {/* <Sidebar /> */}
      <Sidepanel title="Cheeni Mitti" image="https://smartpos.amazon.in/images/6358/51536e48-0e36-4ec9-bffa-afb75ebf0a58_1681454877617.jpg"/>
      </div>
        <div className="intro">
            <img src="https://smartpos.amazon.in/images/6358/51536e48-0e36-4ec9-bffa-afb75ebf0a58_1681454877617.jpg" alt="Logo" />
           <Link to="/" style={{ textDecoration: 'none' }}> <h3 className='title'>Cheeni Mitti</h3></Link>
        </div>
        <div className='bar'>

        </div>
        <div className="catalog">
        <Link to="/best-sellers" className={location.pathname === '/best-sellers' ? 'cataloglink active' : 'cataloglink'}><h3 className='cataloglist'>Featured Products</h3></Link>
        <h3 className='cataloglist' onClick={togglecategoryDropdown}>Categories</h3>
        {dropdownVisible && (
          <div style={{marginTop:"4rem",marginLeft:"8rem",position:"absolute"}}>
            <Categories />
          </div>
          
        )}
        <Link to="/all-products" className={location.pathname === '/all-products' ? 'cataloglink active' : 'cataloglink'}><h3 className='cataloglist'>All Products</h3></Link>
        {
          isAuthenticated ?(
            <Link to="/orders/my-orders" className={location.pathname === '/orders/my-orders' ? 'cataloglink active' : 'cataloglink'}> <h3 className='cataloglist'>My Orders</h3></Link>
          ):(
            <span></span>
          )
        }
        
        </div>
        {
        isAuthenticated ? (<><button className="cart" disabled={loading} ><Link to="/cart"><span style={{color:"white"}}><IoCartOutline/></span></Link></button>


        <div className="location">
        {/* <Link to="/addlocation"> */}
          <h3 onClick={togglePopup}> <FaLocationDot /></h3>
          {showPopup && <Popup onClose={togglePopup} />}
          {/* </Link> */}
        <div className="locationdropdown">
          <p>Enter pincode to know product availability and delivery options</p>
        </div>
    </div>
    </>
        ):
        (
          <p></p>
        )
        }
      {/* <span class="tooltiptext">Enter pincode to know product availability and delivery options</span> */}
        {
          // (<button className="btn" disabled={loading} onClick={logoutHandler}>Logout</button>)
        isAuthenticated ?(
        <span><button className="account" disabled={loading} onClick={toggleDropdown}><HiOutlineUser /></button>
         {showDropdown && (
        <div className="dropdown">
          {/* Dropdown content goes here */}
          <p>{userMobile}</p>
          <button onClick={logoutHandler}>Sign Out <p>< PiSignOutBold/></p> </button>
        </div>
      )}
        </span>
        ):
        ( <>
          <div className="location" style={{marginLeft:"auto"}}>
          <h3 onClick={togglePopup}> <FaLocationDot /></h3>
          {showPopup && <Popup onClose={togglePopup} />}
          <div className="locationdropdown">
          <h3>Enter pincode to know product availability and delivery options</h3>
        </div>
      </div>
        <div className="login">
       <h3><Link to={"/login"}>Login</Link></h3>
    </div>
    </>
     )
      }

       
    </div>
    </>
  )
}

export default Nav;