import React, { useRef, useEffect } from 'react';

import './MapSection.css'

// documentation for this section:
// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox?hl=en
const MapComponentWithSearch = (props) => {

	const { center, zoom, setAddressState } = props

    const refSearchMap = useRef();
    const refSearchBox = useRef();

    var map;
    var searchBox;

    useEffect(() => {
        map = new window.google.maps.Map(refSearchMap.current, { center,zoom });
        // create search box and link it to UI element
        searchBox = new window.google.maps.places.SearchBox(refSearchBox.current);

        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(refSearchBox.current);
        // bias searchbox results towards current map's viewport
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        let markers = [];

		// listen for event fired when user selects a prediction and retrieve
		// more details for that place
        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }

			// clear old markers
            markers.forEach((marker)=>{
                marker.setMap(null);
            });
            markers = [];

// 			for each place, get the icon, name and location
            const bounds = new window.google.maps.LatLngBounds();
            places.forEach((place)=>{
                if (!place.geometry || !place.geometry.location) {
                    console.log("Returned place contains no geometry");
                    return;
                }

				setAddressState(place);

				const { geometry, name, rating, address } = place;

                const marker = GenerateMarker(geometry.location, map, url, name);
                CreateMarkerListener(name, rating, address, map);

                markers.push(marker);

                if (place.geometry.viewport) {
                // only geocodes have viewport
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }, [refSearchMap.current, refSearchBox.current]);

	return (
		<div ref={refSearchMap} id="mapSearch" style={{ zIndex:2 }}>
	        <input ref={refSearchBox} id="pac-input" placeholder={"Search for a new place..."}/>
	    </div>
	);
};

export default MapSection;