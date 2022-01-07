import React, { useState, useEffect } from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './AddRestaurant.css';
import MapSection from './MapSection.jsx';
import FormSection from './FormSection.jsx';

function AddRestaurant({ handleClose }) {

	// for grabbing the maps info
	const [addressState, setAddressState] = useState();

	// For the maps wrapper

    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

	// props for MapSection
	const center = {
        lat: 51.5255,
        lng: 0.0352
    }
    const zoom = 11;

    useEffect(()=> {
        console.log(addressState);
    }, [addressState])

    return <>
        <h1>Leave a review</h1>
        <div className="addRestaurantSection">
	        <FormSection addressInfo={addressState} handleClose={handleClose}/>
	        <Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
				<MapSection center={center} zoom={zoom} setAddressState={setAddressState}/>
			</Wrapper>
	    </div>
    </>
}

export default AddRestaurant;