import React, { useRef, useEffect } from 'react';

// documentation for this section:
// https://developers.google.com/maps/documentation/javascript/examples/places-searchbox?hl=en
const MapSection = ({ center, zoom, setAddressState }) => {

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

                const icon = {
                    url: place.icon,
                    size: new window.google.maps.Size(71, 71),
                    origin: new window.google.maps.Point(0, 0),
                    anchor: new window.google.maps.Point(17, 34),
                    scaledSize: new window.google.maps.Size(25, 25),
                };

				// create a marker for each place
                const marker = new window.google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    icon,
                    title: place.name
                });

                console.log(place)
                setAddressState(place);
                console.log(place.geometry)

                const addressDescription =  `<div style={{ alignContent: center, alignItems: center, textAlign: center }} id="content">
                        <h3 className="formattedAddress">` + place.formatted_address + `</h3>
                    </div>`
                ;

                const infowindow = new window.google.maps.InfoWindow({
                    content: addressDescription,
                });

                (function (m, infowindow) {
                    window.google.maps.event.addListener(m, 'click', function (event) {
                        infowindow.setContent(addressDescription);
                        infowindow.open(map, m);
                    });
                })(marker, infowindow);

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
		<div ref={refSearchMap} id="mapSearch">
	        <input ref={refSearchBox} id="pac-input" placeholder={"Pick a place"}/>
	    </div>
	);
};

export default MapSection;