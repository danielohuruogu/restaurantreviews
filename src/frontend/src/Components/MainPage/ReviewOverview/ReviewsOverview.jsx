import React from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import ReviewMap from './ReviewMap.jsx';
import SearchReviews from './SearchReviews';

function ReviewsOverview() {

	const api_Key = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

	const center = {
		lat: 51.5255,
		lng: 0.0352
	}

	const zoom = 11;

	function render(status) {
        if (status === Status.LOADING) return <h3>{status} ...</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    // in this file will be the filtering function for the searching
    // can pass the filtered data for display through to the review map
    // - this was done by me on the Community page for the app

    useEffect(()=>{
        // here the data for each review on the map will be pulled in
    })

    return <>
        <h1>This is to show the map of all the different restaurants</h1>
        <div className="forMap">
            <Wrapper api_Key={api_Key} render={render} libraries={["places"]}>
                <ReviewMap center={center} zoom={zoom} filteredData={null} {/* will pass through the */}/>
            </Wrapper>
        </div>
        <div className="">
        </div>
    </>
}

export default ReviewsOverview;