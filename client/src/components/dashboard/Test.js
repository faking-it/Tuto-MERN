import React, { useState, useEffect } from "react";
import { Map, TileLayer } from "react-leaflet";
import MarkerCluster from "./MarkerCluster";
import axios from "axios";

const Leaflet = () => {
  const [markers, setMarkers] = useState([]);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      let please = [];
      axios.get("/api/trees/get").then((response) => {
        response.data.forEach((element) => {
          please.push({ position: element });
        });
        setMarkers(please);
      });
    }
    setLoaded(true);
  }, [loaded]);

  return (
    <Map center={[50.632659, 5.579952]} zoom={13}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      />
      <MarkerCluster markers={markers} />
    </Map>
  );
};
export default Leaflet;
