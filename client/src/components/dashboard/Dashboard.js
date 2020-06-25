import React from "react";
import Leaflet from "./Test";
import Side from "./Side";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function alertMessage() {
  var d = new Date();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if (m === 43 && s === 0) {
    toast.error("Watch out! You'll lose half your leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    });
  } else if (
    (m === 39 && s === 0) ||
    (m === 29 && s === 0) ||
    (m === 43 && s === 15)
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
