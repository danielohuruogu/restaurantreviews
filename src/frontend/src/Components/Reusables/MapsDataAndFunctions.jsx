
let mapData = [
	{
		name: "SearchMap",
		params: {
			center: {
				lat: 51.5255,
				lng: 0.0352
			},
			zoom : 11
		}
	},
	{
		name: "ReviewsMap",
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

export function GenerateMarkerAndInfoWindow(place, map, url){

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
		position: place.geometry.location,
		map: map,
		icon: image,
		shape: shape,
		title: place.name
	})

	const markerDescription = `
	<div style={{ alignContent: center, alignItems: center, textAlign: center }}>
        <h4>${place.name}</h4><h4><strong>${place.rating ? place.rating : "no rating available"}</strong></h4>
        <div>
            <h5>${place.address}</h5>
        </div>
    </div>
	`;

	const infoWindow = new window.google.maps.InfoWindow({
		content: markerDescription,
	});

	(function (m, infowindow) {
        window.google.maps.event.addListener(m, 'click', function (event) {
            infowindow.setContent(markerDescription);
            infowindow.open(map, m);
        });
    })(marker, infoWindow);

    return marker;
}