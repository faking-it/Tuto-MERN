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
            axios
                .get("/api/trees/get")
                .then((response) => {
                    response.data.forEach((element) => {
                        please.push({ position: element });

                        //console.log(element);
                    });
                    setMarkers(please);
                    console.log(please.length);
                })


        } setLoaded(true);
    }, [loaded]);

    // console.log(loaded);
    // axios
    //     .get("/api/trees/get")
    //     .then((response) => {
    //         response.data.forEach((element) => {
    //             if (please.length <= 5779) {
    //                 please.push({ position: element });
    //             }
    //         });
    //         setMarkers(please);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    return (
        <Map center={[50.632659, 5.579952]} zoom={13}>
            <TileLayer
                attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                ext = 'png'
            />
            <MarkerCluster markers={markers} />
        </Map>
    );
};
export default Leaflet;