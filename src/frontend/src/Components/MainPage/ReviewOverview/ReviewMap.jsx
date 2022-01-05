import React, { useRef, useEffect } from 'react';

function ReviewMap({ center, zoom, filteredData }) {

	const refMap = useRef();
	var map;

	useEffect(() => {
		map = new window.google.maps.Map(refMap.current, {center,zoom});

		let markers = [];
		filteredData.forEach((data)=>{
			// create a marker
		})


	}, [refMap.current]);

	return <>
		<div ref={refMap} id="map">
		</div>
	</>
}


export default ReviewMap;