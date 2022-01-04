import React from "react";
import { useState, useEffect, useRef } from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import './AddRestaurant.css';
import MapSection from './MapSection.jsx';
import FormSection from './FormSection.jsx';

function AddRestaurant() {

	// for grabbing the maps info
	const [addressState, setAddressState] = useState();

	// For the maps wrapper

    const api_Key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

	// props for MapSection
	const center = {
        lat: 51.5255,
        lng: 0.0352
    }
    const zoom = 10;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    useEffect(()=> {
        console.log(addressState);
    }, [addressState])

    return <>
        <h1>To see how a restaurant will be added to the database</h1>
        <div className="addRestaurantSection">
	        <FormSection addressInfo={addressState}/>
		    <Wrapper apiKey={api_Key} render={render} libraries={["places"]}>
				<MapSection center={center} zoom={zoom} setAddressState={setAddressState}/>
		    </Wrapper>
	    </div>
    </>
}

export default AddRestaurant;