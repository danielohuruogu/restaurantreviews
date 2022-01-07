import React, { useRef, useEffect } from 'react';


function ReviewMap({ center, zoom, filteredData }) {

	const refReviewsMap = useRef();

	var map;

	useEffect(() => {
		map = new window.google.maps.Map(refReviewsMap.current, {center,zoom});
		let markers = [];

		const bounds = new window.google.maps.LatLngBounds();
		filteredData.forEach((place)=>{
			console.log(place);
			// create a marker
	        if (!place.geometry || !place.geometry.location) {
	            console.log("Returned place contains no geometry");
	            return;
	        }

	        const image = {
		        url: "./../../../public/fried-chicken.png",
		        size: new window.google.maps.Size(32,32),
		        origin: new window.google.maps.Point(0,0),
		        anchor: new window.google.maps.Point(16,16)
	        }
	// 		console.log("hi");

			const shape = {
				coords: [1,32,32,1],
				type: "rect"
			}

			const marker = new window.google.maps.Marker({
				map,
				position: place.location,
				image,
				title: place.name
			})

			marker.setMap(map);
		})
	}, [refReviewsMap.current, filteredData]);

	return (
		<div ref={refReviewsMap} id="mapMain" style={{
			height: "95%",
			width:"90%",
			position: "relative",
			right: "2%",}}>
		</div>
	);
}
export default ReviewMap;