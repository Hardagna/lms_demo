import React from 'react';
import { MdSpaceDashboard } from "react-icons/md";
import './profile.css';
import { UserData } from '../../context/UserContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Profile = ({user}) => {
  const {setIsAuth, setUser} = UserData();

  const navigate = useNavigate();
  
  const logoutHandler = () => {
    localStorage.clear();
    setIsAuth(false);
    setUser([]);
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div>
        {user && (
            <div className="profile">
                <h2>My account</h2>
                <div className="account-details">
                    <p><strong>Name: {user.name}</strong></p>
                    <p><strong>Email: {user.email}</strong></p>
                    <button onClick={()=> navigate(`/${user._id}/dasboard`) } className="commonBtn"><MdSpaceDashboard />Dashboard</button>

                    <br />

                    <button onClick = {logoutHandler} className="commonBtn" style={{ background : "red" }} >Logout</button>
                </div>  
            </div>
        )}
    </div>
  )
};

export default Profile;