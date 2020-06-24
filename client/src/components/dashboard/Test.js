import React, { useState, useEffect } from "react";
import { Map, TileLayer, useLeaflet } from "react-leaflet";
import L, { circle } from "leaflet";
import { connect } from "react-redux";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ReactDOMServer from "react-dom/server";
const mcg = L.markerClusterGroup();
const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();
  useEffect(() => {
    const customMarker = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40],
    });
    mcg.clearLayers();
    markers.forEach((element) => {
      L.marker(new L.LatLng(element.geoloc.lat, element.geoloc.lon), {
        icon: customMarker,
      })
        .addTo(mcg)
        .bindPopup(
          ReactDOMServer.renderToString(
            <div>
              <h2>Tree {element.arbotag}</h2>
              <div>Leaves: {element.leaves}</div>
              <div>Owner: {element.owner}</div>
              <div>
                <Button id="buy">Buy</Button>
              </div>
            </div>
          )
        )
        .on("popupopen", (a) => {
          var popUp = a.target.getPopup();
          popUp
            .getElement()
            .querySelector("#buy")
            .addEventListener("click", (e) => {
              axios
                .post("/api/trees/buy", {
                  lat: element.geoloc.lat,
                  lon: element.geoloc.lon,
                })
                .then((response) => {
                  console.log("success");
                })
                .catch((err) => {
                  console.log(err);
                });
            });
        });
    });

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);
  //mcg.on("click", (e) => {
  //let treesAround = [];
  //L.Circle.include({
  //contains: function (circ, latLng) {
  //return circ.getLatLng().distanceTo(latLng) < circ.getRadius();
  //},
  //});
  //const circle = L.circle(e.latlng, {
  //radius: 100,
  //opacity: 0,
  //fillOpacity: 0,
  //}).addTo(map);
  //for (let i = 0; i < markers.length; i++) {
  //if (
  //circle.contains(circle, [markers[i].geoloc.lat, markers[i].geoloc.lon])
  //) {
  //treesAround.push(markers[i]);
  //}
  //}
  //});
  return null;
};

const Leaflet = () => {
  let please = [];
  const [load, setLoad] = useState(false);
  const [markers, setMarkers] = useState([]);
  if (load === false) {
    axios
      .get("/api/trees/get")
      .then((response) => {
        response.data.forEach((element) => {
          please.push(element);
        });
        setMarkers(please);
        setLoad(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <Map center={[50.632659, 5.579952]} zoom={13}>
        <TileLayer
          attribution={
            '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          }
          url={"http://{s}.tile.osm.org/{z}/{x}/{y}.png"}
        />
        <MarkerCluster markers={markers} />
      </Map>
    </div>
  );
};
export default Leaflet;
