import React from "react";
import Leaflet from "./Test";
import Side from "./Side";

import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Gain/lose leaves

function alertMessage() {
  var d = new Date();
  var m = d.getMinutes();
  var s = d.getSeconds();

  // Display message -- Lisa's part
  if (m === 59 && s === 0) {
    toast.error("Watch out! You'll lose half your leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
    toast.success("Nice! You'll get some leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });

  } else if (
    (m === 14 && s === 0) ||
    (m === 29 && s === 0) ||
    (m === 44 && s === 0)
  ) {
    toast.success("Nice! You'll get some leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  }
  // Change leaves/trees values of each players in the database -- Bruno's part

  // Il faut encore intéragir avec le leaderboard, car il ne se met pas à jour ici. 
  if (m === 0 && s === 0) {
    axios.get("api/auth/All").then((response) => {
      response.data.forEach(element => {
        element.leaves = (element.leaves / 2) + element.trees;
        
        const body = {
          "id": element._id,
          "leaves": element.leaves
        };
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios.post("api/users/update", body, config);
      });

      axios.get("api/auth").then((response) => {
        document.getElementsByClassName("leaves")[0].innerHTML = response.data.leaves;
      });
    });

  } else if (
    (m === 15 && s === 0) ||
    (m === 30 && s === 0) ||
    (m === 45 && s === 0)
  ) {

    axios.get("api/auth/All").then((response) => {
      response.data.forEach(element => {
        element.leaves = element.leaves + element.trees;

        const body = {
          "id": element._id,
          "leaves": element.leaves
        };
        const config = {
          headers: {
            "Content-Type": "application/json"
          }
        };
        axios.post("api/users/update", body, config);
      });

      axios.get("api/auth").then((response) => {
        document.getElementsByClassName("leaves")[0].innerHTML = response.data.leaves;
      });
    });
  }
}
setInterval(alertMessage, 1000);

const Dashboard = () => {
  return (
    <div className={"flex-container"}>
      <Leaflet />
      <Side />
      <ToastContainer
        position="bottom-right"
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Dashboard;
