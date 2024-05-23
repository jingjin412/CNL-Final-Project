import React from "react";
import "../App.css";
import { auth } from "../config/firebase";

const GPSPage = () => {
    console.log(auth)
  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const showPosition = (position) => {
    alert("Latitude: " + position.coords.latitude + 
          "\nLongitude: " + position.coords.longitude);
  };

  const showError = (error) => {
    switch(error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  };

  return (
    <div className="login-container"> 
        <p className="login-prompt">Hello {auth?.currentUser.displayName}, please let me check your location :)</p>
        <button className="login-button" onClick={getLocation}>Get GPS Location</button>
    </div>
  );
};

export default GPSPage;