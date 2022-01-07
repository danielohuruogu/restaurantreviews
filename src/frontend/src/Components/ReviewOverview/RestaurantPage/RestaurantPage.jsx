import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleData } from './../mapdata.js';
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ChickenBucket from './../../Images/fried-chicken-bucket.png';

import Review from './Review.jsx';
import ReviewContainer from './ReviewContainer.jsx';

import './RestaurantPage.css';

function RestaurantPage () {

	let params = useParams();

	let restaurantId = parseInt(params.restaurantId, 10);
	// will need to be a different function to grab data from the server on loading the page
	// may have to be a useEffect for grabbing just one piece of info
	let restaurantData = getSingleData(restaurantId);

	const center = {
        lat: restaurantData.geometry.location.lat,
        lng: restaurantData.geometry.location.lng,
    }

    const zoom = 12;

    // in this file will be the filtering function for the searching
    // can pass the filtered data for display through to the review map
    // - this was done by me on the Community page for the app

    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    const refResMap = useRef();

    useEffect(()=>{
        var map = new window.google.maps.Map(refResMap.current, {center,zoom})

		const image = {
            url: ChickenBucket,
            size: new window.google.maps.Size(32,32),
            origin: new window.google.maps.Point(0,0),
            anchor: new window.google.maps.Point(16,16)
        }

        const shape = {
            coords: [1,32,32,1],
            type: "rect"
        };

		const marker = new window.google.maps.Marker({
			position: center,
			map,
			icon: image,
			shape: shape,
			title: restaurantData.name
		});
    }, [refResMap.current])

	return(
	<div className="restaurantPage">
		<div className="restaurantInfo">
			<div className="summary">
				<h1>{restaurantData.name}</h1>
				<h2>{restaurantData.address}</h2>
				<h1>{restaurantData.ave_rating}</h1>
			</div>
		</div>
		<div className="restaurantMapContainer">
			<Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
				<div ref={refResMap} id="resMap"/>
			</Wrapper>
		</div>
		<div className="reviewContainer">
			<h1>Reviews</h1>
			<ReviewContainer
				data={restaurantData.reviews}
                RenderComponent={Review}
				/>
		</div>
	</div>
	)
}

export default RestaurantPage