import React from 'react';
import { useRef, useEffect } from 'react';

const MapSection = ({ center, zoom, setAddressState }) => {

    const refMap = useRef();
    const refSearchBox = useRef();

    var map;
    var searchBox;

    useEffect(() => {
        map = new window.google.maps.Map(refMap.current, { center,zoom });
        searchBox = new window.google.maps.places.SearchBox(refSearchBox.current);

        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(refSearchBox.current);
        map.addListener("bounds_changed", () => {
            searchBox.setBounds(map.getBounds());
        });

        let markers = [];

        searchBox.addListener("places_changed", () => {
            const places = searchBox.getPlaces();
            if (places.length === 0) {
                return;
            }

            markers.forEach((marker)=>{
                marker.setMap(null);
            });
            markers = [];

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

                const marker = new window.google.maps.Marker({
                    map,
                    position: place.geometry.location,
                    icon,
                    title: place.name
                });

//                 console.log(place)
                setAddressState(place);
//                 console.log("tried to change the state")
//                 console.log(place.geometry)

//                 function populateAddressFields() {
//                     console.log("Hi");
//                 };

                const addressDescription =  `<div style={{ align-content: center, align-items: center, text-align: center }} id="content">
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
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            map.fitBounds(bounds);
        });
    }, [refMap.current, refSearchBox.current]);

	return (
		<div ref={refMap} id="map">
	        <input ref={refSearchBox} id="pac-input" placeholder={"Pick a place"}/>
	    </div>
	);
};

export default MapSection;