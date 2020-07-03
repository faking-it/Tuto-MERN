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

function commentSubmit() {
  console.log("llllllllllllllllllllllllll");
  const body = {
    text: "looooooool",
    treeId: "5ed89d0872a52714088545eb",
    userId: "5ef0bc0c08b907169c1396ec"
  };
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  axios.post("api/comments", body, config);
}

const mcg = L.markerClusterGroup();
const MarkerCluster = ({ markers }) => {
  const { map } = useLeaflet();
  useEffect(() => {
    const customMarker = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      shadowSize: [0, 0],
      iconSize: [25, 41],
      iconAnchor: [10, 41],
      popupAnchor: [2, -40]
    });
    mcg.clearLayers();
    markers.forEach((element) => {
      L.marker(new L.LatLng(element.geoloc.lat, element.geoloc.lon), {
        icon: customMarker
      })
        .addTo(mcg)
        .bindPopup(
          ReactDOMServer.renderToString(
            <div>
              <h2>Tree {element.arbotag}</h2>
              <div>Leaves: {element.leaves}</div>
              <div>Owner: {element.owner}</div>
              <div>
                {element.lock ? (
                  <Button id="buy" disabled>
                    Buy
                  </Button>
                ) : (
                  <Button id="buy">Buy</Button>
                )}
                <Button id="lock">Lock</Button>

                <div className="post-form">
                  <div className="bg-primary p">
                    <h3>Leave a Comment</h3>
                  </div>
                  <form
                    className="form my-1"
                    //action={commentSubmit()}
                  >
                    <textarea
                      name="text"
                      cols="30"
                      rows="5"
                      placeholder="Add a comment about this tree."
                      required
                    />
                    <input
                      type="submit"
                      className="btn-dark my-1"
                      value="Submit"
                    />
                  </form>
                </div>
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
                  lon: element.geoloc.lon
                })
                .then((response) => {
                  axios.post(
                    "/api/side/gamelog",
                    JSON.stringify({ action: "has bought a tree!" }),
                    {
                      headers: {
                        "Content-Type": "application/json"
                      }
                    }
                  );

                  const likeAudio = new Audio(soundFile);
                  const playSound = (audioFile) => {
                    audioFile.play();
                  };
                  playSound(likeAudio);

                  popUp.setContent(
                    ReactDOMServer.renderToString(
                      <div>
                        <h2>Tree {response.data.arbotag}</h2>
                        <div>Leaves: {response.data.leaves}</div>
                        <div>Owner: {response.data.owner}</div>
                        <div>
                          <Button id="buy">Buy</Button>
                          <Button id="lock">Lock</Button>
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
                  console.log(err);
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
                  lon: element.geoloc.lon
                })
                .then((response) => {
                  console.log(response.data);
                })
                .catch((err) => {
                  console.log(err.response.data);
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
        attribution={
          '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }
        url={"http://{s}.tile.osm.org/{z}/{x}/{y}.png"}
      />
      <MarkerCluster markers={markers} />
    </Map>
  );
};
export default Leaflet;
