import React, { useState, useEffect } from 'react';
import "../App.css";
import { useNavigate }  from "react-router-dom";
import { auth } from "../config/firebase";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import MapContainer from '../config/MapContainer';

const GPSPage = () => {
    const navigate = useNavigate();
    const [userToken, setUserToken] = useState(null);
    
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                getIdToken(user).then((token) => {
                    setUserToken(token);
                });
            } else {
                alert("You haven't sign in, please sign in first!")
                navigate("/");
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            console.log("Geolocation is not supported by this browser.");
        }
    };

    const showPosition = (position) => {
        setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    };

    const showError = (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                alert('User denied the request for Geolocation.')
                console.log("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                alert('Location information is unavailable.')
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert('The request to get user location timed out.')
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                alert('An unknown error occurred.')
                console.log("An unknown error occurred.");
                break;
            default:
                alert('What error occurred.')
                console.log("What error occurred.");
                break;
        }
    };

    const SignIn = () => {
        if (!userToken) {
            alert("You haven't signed in, please sign in first!");
            return;
        }

        navigate('/Success');
    };

    return (
        <div className="GPS-container"> 
            {/* <img src="/logo_tran.png" alt="Logo" className="logo" /> */}
            <p className="login-prompt">Hello {auth?.currentUser?.displayName || "User"}, please let me check your location :)</p>
            <button className="GPS-button" onClick={getLocation}>Get GPS Location</button>
            {location.latitude && location.longitude && (
                <>
                    <p className="login-prompt">You are here!</p>
                    <MapContainer lat={location.latitude} lng={location.longitude} />
                    <button className="GPS-button" onClick={SignIn}>Sign In</button>
                </>
            )}
        </div>
    );
};

export default GPSPage;