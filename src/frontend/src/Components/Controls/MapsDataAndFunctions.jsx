import React from 'react'

let mapData = [
	{
		name: "AddRestaurantMap",
		params: {
			center: {
				lat: 51.5255,
				lng: 0.0352
			},
			zoom : 11
		}
	},
	{
		name: "RestaurantPageMap",
		params: {
			zoom: 12,
		}
	},
	{
		name: "SummaryMap",
		params: {
			center: {
				lat: 51.5087908,
				lng: -0.1289414
			},
			zoom: 9,
		}
	}
]

export function MapParams() {
	return mapData;
}

export function GenerateMarkers(position, map, url, title){

	const image = {
		url: url,
		size: new window.google.maps.Size(32,32),
		origin: new window.google.maps.Point(0,0),
		anchor: new window.google.maps.Point(16,16)
	}

	const shape = {
    	coords: [1,32,32,1],
    	type: "rect",
    }
	const marker = new window.google.maps.Marker({
		position: position,
		map: map,
		icon: image,
		shape: shape,
		title: title
	})
	return marker;
}

export function CreateMarkerListener(name, rating, address, map) {
	const markerDescription = `
	<div style={{ alignContent: center, alignItems: center, textAlign: center }}>
        <h4>${name}</h4><h4><strong>${rating}</strong></h4>
        <div>
            <h5>${address}</h5>
        </div>
    </div>
	`;

	const infoWindow = new window.google.maps.InfoWindow({
		content: markerDescription,
	});

	(function (m, infoWindow) {
		window.google.maps.event.addListener(m, 'click', function(event) {
			infoWindow.setContent(markerDescription);
			infoWindow.open(map, m)
		})
	})(marker, infoWindow);
}