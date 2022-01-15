import React, { useEffect, useState, useReducer } from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { Outlet } from 'react-router-dom';

// import { Button } from 'antd';
// import { Box, Modal, Typography } from '@mui/material';

import ReviewMap from './ReviewMap.jsx';

import AddRestaurantButton from './AddRestaurant/AddRestaurantButton';

import SearchBar from './SearchReviewsSection/SearchBar';
import SearchResultsContainer from './SearchReviewsSection/SearchResultsContainer';
import SearchResult from './SearchReviewsSection/SearchResult';

import { SearchResultReducer, initialState } from './SearchReviewsSection/SearchResultReducer';

import { getData } from './mapdata.js'

import './ReviewsOverview.css';


function ReviewsOverview() {

	//******************** TO DISPLAY THE MAIN MAP *******************//

	const center = {
		lat: 51.5087908,
		lng: -0.1289414
	}

	const zoom = 9;

    // in this file will be the filtering function for the searching
    // can pass the filtered data for display through to the review map
    // - this was done by me on the Community page for the app

    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    //******************** FOR THE SEARCH + FILTER FUNCTION *******************//
	// **** TO GRAB USERS FROM SERVER AND STORE WITH A STATE **** //
    const [serverData, setServerData] = useState([]);

    useEffect(()=>{
        // here the data for each review on the map will be pulled in
		setServerData(getData());
    }, [])

	// **** TO DISPLAY PARAMS IN URL BROWSER **** //
//     const { search } = window.location;
//
//     const query = new URLSearchParams(search).get("search"); // grab the params from the search bar

    // ****** FOR DYNAMIC SEARCH BAR ****** //
    const [searchQuery, setSearchQuery] = useState(""); //want to make it nothing, but ok for now...

    function filterResults(results, query) {
        query = query.toLowerCase(); // will make all text that comes through lower-case
        if (!query) {
            return results;
        }
    // filter through the results and return those that have the query included in any of the fields listed below

        return results.filter((result) => {
            const resultInfo = {
                // for each data object that comes through, make the info lower-case
                name: result.name.toLowerCase(),
                address: result.address.toLowerCase(),
				type_food: result.type_food.toLowerCase(),
				// will have to go through array of keywords and types of food, add them to results object
            }
            return (
                // return the data objects that include the query in any of their fields
                resultInfo.name.startsWith(query) ||
                resultInfo.address.includes(query) ||
                resultInfo.type_food.includes(query)
            )
        });
    };

	// an array object is the return of the filterResults function
    const filteredResults = filterResults(serverData, searchQuery);

	// ***** FOR MODAL LOGIC ****** //
	// for the modal reducer
	const [state, dispatch] = useReducer(SearchResultReducer, initialState);

    return <div className="pageContent">
		<AddRestaurantButton serverData={serverData} />
		<div className="reviewMapContainer">
			<Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
			    <ReviewMap center={center} zoom={zoom} filteredData={filteredResults}/>
			</Wrapper>
		</div>
		<div className="reviewSearchContainer">
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
			<SearchResultsContainer
			    data={filteredResults}
			    RenderComponent={SearchResult}
			    dispatch={dispatch} // for useReducer hook
			    state={state} // for useReducer hook
				/>
		</div>
		<Outlet />
    </div>
}

export default ReviewsOverview;