import React, { useState } from 'react';

import FormSection from '../Components/FormSection.jsx';

import { MapParams } from '../Components/Reusables/MapsDataAndFunctions.jsx';
import MapsWrapper from '../Components/Reusables/MapsWrapper';
import SearchMap from '../Components/SearchMap.jsx';

import '../Styles/AddRestaurant.css';

function AddRestaurant(props) {

	const [addressState, setAddressState] = useState();

	const { data } = props;

	const mapData = MapParams();
    const { params } = mapData[0];

    return <>
        <div className="addRestaurantSection">
	        <FormSection addressInfo={addressState} data={data}/>
	        <MapsWrapper
	            center={params.center}
	            zoom={params.zoom}
	            style={{
	                gridArea: "map",
	                width: "100%"
	            }}
	            ComponentToRender={SearchMap}
	            setAddressState={setAddressState}
	            />
	    </div>
    </>
}

export default AddRestaurant;