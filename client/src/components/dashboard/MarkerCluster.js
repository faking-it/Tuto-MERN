import {useEffect} from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {useLeaflet} from "react-leaflet";

const mcg = L.markerClusterGroup();

const MarkerCluster = ({markers}) => {
    const {map} = useLeaflet();

    useEffect(() => {
        const customMarker = new L.Icon({
            iconUrl:
                "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [10, 41],
            popupAnchor: [2, -40],
        });
        mcg.clearLayers();
        markers.forEach(({position}) =>
            L.marker(new L.LatLng(position.lat, position.lon), {
                icon: customMarker,
            }).addTo(mcg),
        );

        // optionally center the map around the markers
        // map.fitBounds(mcg.getBounds());
        // // add the marker cluster group to the map
        map.addLayer(mcg);
    }, [markers, map]);

    return null;
};

MarkerCluster.propTypes = {
    markers: PropTypes.arrayOf(
        PropTypes.shape({
            position: PropTypes.objectOf(PropTypes.number).isRequired,
        }).isRequired,
    ).isRequired,
};

export default MarkerCluster;