import {useEffect} from "react";
import PropTypes from "prop-types";
import L from "leaflet";
import "leaflet.markercluster/dist/leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import {useLeaflet} from "react-leaflet";

const mcg = L.markerClusterGroup();

const svgPath = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="151.5px"
	 height="251.5px" viewBox="0 0 151.5 251.5" style="enable-background:new 0 0 151.5 251.5;" xml:space="preserve">
<style type="text/css">
	.st0{fill:#010101;}
</style>
<defs>
</defs>
<path class="st0" d="M75.8,0C33.9,0,0,33.9,0,75.7c0,0,0,0,0,0C0,139,75.5,251.5,75.8,251.5S151.5,138,151.5,75.8
	C151.5,33.9,117.6,0,75.8,0C75.8,0,75.8,0,75.8,0z M81.6,96.7v21.6h-10V96.7H40.1l14-18.7h-9.7l14.5-16.7h-6.8l23.8-29.5l23.9,29.5
	H93L107.5,78h-9.5l15.1,18.7H81.6z"/>
</svg>`

const MarkerCluster = ({markers}) => {
    const {map} = useLeaflet();

    useEffect(() => {
        const customMarker = new L.Icon({
            iconUrl: `data:image/svg+xml;base64,${btoa(svgPath)}`,
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