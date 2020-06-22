import React from "react";
import Leaflet from "./Test";
import Side from "./Side";

const Dashboard = () => {
  return (
    <div className={"flex-container"}>
      <Leaflet />
      <Side />
    </div>
  );
};

export default Dashboard;
