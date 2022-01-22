import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Dashboard = () => {
    const { user } = useGlobalContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!user && navigate) {
          navigate("/");
        }
      }, [user, navigate]);
    
  return <h2>Dashboard</h2>;
};

export default Dashboard;
