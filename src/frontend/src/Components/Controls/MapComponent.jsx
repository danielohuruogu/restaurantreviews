import React, { useRef, useEffect } from 'react';
import { GenerateMarker, CreateMarkerListener } from './MapsDataAndFunctions.jsx';

export function MapComponent(props) {

	const { center, zoom, dataToDisplay=null, url=null, setState } = props

	const refMap = useRef();

	var map;

	useEffect(()=> {
		map = new window.google.maps.
		const bounds = new window.google.maps.LatLngBounds();
		let markers = [];

		// if data has been passed through
		if (dataToDisplay) {
			// if there's just one piece of data to display, if it's not an array (presumably)
			if (typeof dataToDisplay !== 'array') {
				GenerateMarker(center, map, url, dataToDisplay.name);
			}
			if (typeof dataToDisplay === 'array') {
				dataToDisplay.forEach((place)=> {
					if(!place.geometry || !place.geometry.location) {
						console.log("returned place has no geometry")
						return
					}

					const { geometry, name, rating, address } = place;

					const marker = GenerateMarker(geometry.location, map, url, name);
					CreateMarkerListener(name, rating, address, map);
				})
			}
		}
	}, [refMap.current, dataToDisplay])

	return (
		<div ref={refMap} />
	)
}
