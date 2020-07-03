// import React, { useState, useEffect } from "react";
// import { Map, TileLayer } from "react-leaflet";
// import MarkerCluster from "./MarkerCluster";
// import axios from "axios";

// const Leaflet = () => {
//   const [markers, setMarkers] = useState([]);

//   const [loaded, setLoaded] = useState(false);

//   useEffect(() => {
//     if (!loaded) {
//       let please = [];
//       axios.get("/api/trees/get").then((response) => {
//         response.data.forEach((element) => {
//           please.push({ position: element });
//         });
//         setMarkers(please);
//       });
//     }
//     setLoaded(true);
//   }, [loaded]);

//   return (
//     <Map center={[50.632659, 5.579952]} zoom={13}>
//       <TileLayer
//         attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//         url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
//       />
//       <MarkerCluster markers={markers} />
//     </Map>
//   );
// };
// export default Leaflet;
import React, { useState, useEffect } from "react";
import { Map, TileLayer, useLeaflet } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import axios from "axios";
import Button from "react-bootstrap/Button";
import ReactDOMServer from "react-dom/server";
import soundFile from "../../Sounds/click.wav";

const mcg = L.markerClusterGroup();
const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();
  useEffect(() => {
    mcg.clearLayers();
    markers.forEach((element) => {
      const svgPath = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="151.5px"
            height="251.5px" viewBox="0 0 151.5 251.5" style="enable-background:new 0 0 151.5 251.5;" xml:space="preserve">
            
          <style type="text/css">
            .st0{fill: ${element.owner ? element.color : "#0C2116"};}
          </style>
      
          <path class="st0" d="M75.8,0C33.9,0,0,33.9,0,75.7c0,0,0,0,0,0C0,139,75.5,251.5,75.8,251.5S151.5,138,151.5,75.8
            C151.5,33.9,117.6,0,75.8,0C75.8,0,75.8,0,75.8,0z M81.6,96.7v21.6h-10V96.7H40.1l14-18.7h-9.7l14.5-16.7h-6.8l23.8-29.5l23.9,29.5
            H93L107.5,78h-9.5l15.1,18.7H81.6z"/>
          </svg>`;
      const customMarker = new L.Icon({
        iconUrl: `data:image/svg+xml;base64,${btoa(svgPath)}`,
        shadowSize: [0, 0],
        iconSize: [25, 41],
        iconAnchor: [10, 41],
        popupAnchor: [2, -40],
      });

      L.marker(new L.LatLng(element.geoloc.lat, element.geoloc.lon), {
        icon: customMarker,
      })
        .addTo(mcg)
        .bindPopup(
          ReactDOMServer.renderToString(
            <div className="popup">
              {element.lock ? (
                <h6>Tree {element.arbotag} Locked</h6>
              ) : (
                <h6>Tree {element.arbotag}</h6>
              )}
              <div className={"error"}> </div>
              <div>Leaves: {element.leaves}</div>
              <div>Owner: {element.owner}</div>
              <div>
                {element.lock ? (
                  <div className={"popup-btn"}>
                    <Button id="buy" disabled>
                      Buy
                    </Button>

                    <Button id="lock" disabled>
                      Unlock
                    </Button>
                  </div>
                ) : (
                  <div className={"popup-btn"}>
                    <Button id="buy">Buy</Button>
                    <Button id="lock" disabled>
                      Lock
                    </Button>
                  </div>
                )}
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
              const likeAudio = new Audio(soundFile);
              const playSound = (audioFile) => {
                audioFile.play();
              };
              playSound(likeAudio);
              axios
                .post("/api/trees/buy", {
                  lat: element.geoloc.lat,
                  lon: element.geoloc.lon,
                })
                .then((response) => {
                  axios.post(
                    "/api/side/gamelog",
                    JSON.stringify({ action: "has bought a tree!" }),
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    }
                  );
                  //e.target.closePopup();
                  popUp.setContent(
                    ReactDOMServer.renderToString(
                      <div>
                        {element.lock ? (
                          <h2>Tree {response.data.arbotag} Locked</h2>
                        ) : (
                          <h2>Tree {response.data.arbotag}</h2>
                        )}
                        <div className={"error"}> </div>
                        <div>Leaves: {response.data.leaves}</div>
                        <div>Owner: {response.data.owner}</div>
                        <div>
                          {element.lock ? (
                            <div className={"popup-btn"}>
                              <Button id="buy" disabled>
                                Buy
                              </Button>

                              <Button id="lock">Unlock</Button>
                            </div>
                          ) : (
                            <div className={"popup-btn"}>
                              <Button id="buy">Buy</Button>
                              <Button id="lock">Lock</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  );
                  axios.get("api/auth").then((response) => {
                    document.getElementsByClassName("trees")[0].innerHTML =
                      response.data.trees;
                    document.getElementsByClassName("leaves")[0].innerHTML =
                      response.data.leaves;
                  });
                  // axios.get("api/auth").then((response) => {

                  //   console.log(response.data.trees);
                  // });
                  // axios.get("api/auth").then((response) => {

                  // });
                })
                .catch((err) => {
                  document.getElementsByClassName("error")[0].innerHTML =
                    err.response.data;
                });
            });
          popUp
            .getElement()
            .querySelector("#lock")
            .addEventListener("click", (e) => {
              const likeAudio = new Audio(soundFile);
              const playSound = (audioFile) => {
                audioFile.play();
              };
              playSound(likeAudio);
              axios
                .post("/api/trees/lock", {
                  lat: element.geoloc.lat,
                  lon: element.geoloc.lon,
                })
                .then((response) => {
                  popUp.setContent(
                    ReactDOMServer.renderToString(
                      <div>
                        <h2>Tree {response.data.arbotag}</h2>
                        <div>Leaves: {response.data.leaves}</div>
                        <div>Owner: {response.data.owner}</div>
                        <div>
                          {response.data.lock ? (
                            <div>
                              <Button id="buy" disabled>
                                Buy
                              </Button>
                              <Button id="lock">Unlock</Button>
                            </div>
                          ) : (
                            <div>
                              <Button id="buy">Buy</Button>
                              <Button id="lock">Lock</Button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  );
                })
                .catch((err) => {
                  console.log(err.response.data);
                  document.getElementsByClassName("error")[0].innerHTML =
                    err.response.data;
                });
            });
        });
    });

    // optionally center the map around the markers
    // map.fitBounds(mcg.getBounds());
    // // add the marker cluster group to the map
    map.addLayer(mcg);
  }, [markers, map]);
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
    <Map center={[50.632659, 5.579952]} zoom={13}>
      <TileLayer
        attribution=  'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}'
        attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        ext = 'png'
      />
      <MarkerCluster markers={markers} />
    </Map>
  );
};
export default Leaflet;
