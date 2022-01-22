import React, { useRef, useEffect } from 'react';
import { GenerateMarkerAndInfoWindow } from './MapsDataAndFunctions.jsx';

function MapComponent(props) {

	const { center, zoom, style, dataToDisplay=null, url=null, className=null } = props

	const refMap = useRef();

	var map;

	useEffect(()=> {
		map = new window.google.maps.Map(refMap.current, {center,zoom});
// 		const bounds = new window.google.maps.LatLngBounds();
// 		let markers = [];

		// if data has been passed through
		if (dataToDisplay) {
			// if there's just one piece of data to display, if it's not an array (presumably)
// 			if (typeof dataToDisplay === 'object') {
// 				GenerateMarkerAndInfoWindow(dataToDisplay, map, url);
// 			}
// 			if (typeof dataToDisplay === 'array') {
			dataToDisplay.forEach((place)=> {
				if(!place.geometry || !place.geometry.location) {
					console.log("returned place has no geometry")
					return
				}
// 				const marker =
				GenerateMarkerAndInfoWindow(place, map, url);
			})
// 			}
		}
	}, [refMap.current, dataToDisplay])

	return (
		<div ref={refMap} style={style}
            />
	)
}

export default MapComponent;