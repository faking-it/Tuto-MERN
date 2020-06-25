import React from "react";
import Leaflet from "./Test";
import Side from "./Side";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function alertMessage() {
  var d = new Date();
  var m = d.getMinutes();
  var s = d.getSeconds();

  if(m === 59 && s === 0){
    toast.error("Watch out! You'll lose half your leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      });
  }
  else if (m === 14 && s === 0 || m === 29  && s === 0 || m === 44 && s === 0){
    toast.success("Nice! You'll get some leaves in a minute!", {
      position: "bottom-right",
      autoClose: 60000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
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
          autoClose={6000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover={false}
        />

    </div>
  );
};

export default Dashboard;
