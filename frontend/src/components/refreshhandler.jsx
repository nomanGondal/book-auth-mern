import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function refreshhandler(setisauthenticated) {

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        // Check if user is authenticated
        if (localStorage.getItem('token')) {
            setisauthenticated(true);
            if ( location.pathname === '/'|| location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/mainpage');
        }
    }}, [setisauthenticated, navigate, location]);
  return (
    null
  )
}

export default refreshhandler