import React, { useRef, useEffect } from 'react';
import Chicken from './../Images/fried-chicken.png';

// this is the map that will show on the review overview page
function ReviewMap({ center, zoom, filteredData }) {

	const refReviewsMap = useRef();

	var map;

	useEffect(() => {
		map = new window.google.maps.Map(refReviewsMap.current, {center,zoom});
		let markers = [];

		const bounds = new window.google.maps.LatLngBounds();
		filteredData.forEach((place)=>{
			// create a marker
	        if (!place.geometry || !place.geometry.location) {
	            console.log("Returned place contains no geometry");
	            return;
	        }

	        const image = {
		        url: Chicken,
		        size: new window.google.maps.Size(32,32),
		        origin: new window.google.maps.Point(0,0),
		        anchor: new window.google.maps.Point(16,16)
	        }

			const shape = {
				coords: [1,32,32,1],
				type: "rect"
			};

			const marker = new window.google.maps.Marker({
				position: place.geometry.location,
				map,
				icon: image,
				shape: shape,
				title: place.name
			});

			const restaurantDescription = `
			<div style={{ alignContent: center, alignItems: center, textAlign: center }}>
				<h4>${place.name}</h4><h4><strong>${place.ave_rating}</strong></h4>
				<div>
					<h5>${place.address}</h5>
				</div>
			</div>
			`;

			const infowindow = new window.google.maps.InfoWindow({
				content: restaurantDescription,
			});

			(function (m, infowindow) {
				window.google.maps.event.addListener(m, 'click', function(event) {
					infowindow.setContent(restaurantDescription);
					infowindow.open(map,m)
				});
			})(marker, infowindow);
		})
	}, [filteredData]);

	return (
		<div ref={refReviewsMap} id="mapMain" style={{
			height: "95%",
			width:"90%",
			position: "relative",
			right: "2%"}}
			/>
	);
}
export default ReviewMap;