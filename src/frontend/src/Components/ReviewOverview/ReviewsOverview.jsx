import React, { useEffect, useState, useReducer } from 'react';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import { Button } from 'antd';
import { Box, Modal, Typography } from '@mui/material';

import ReviewMap from './ReviewMap.jsx';

import AddRestaurant from './AddRestaurant/AddRestaurant';

import SearchBar from './SearchReviewsSection/SearchBar';
import SearchResultsContainer from './SearchReviewsSection/SearchResultsContainer';
import SearchResult from './SearchReviewsSection/SearchResult';

import { SearchResultReducer, initialState } from './SearchReviewsSection/SearchResultReducer';

import './ReviewsOverview.css';


function ReviewsOverview() {

	//******************** FOR THE 'ADD A REVIEW' BUTTON + MODAL *******************//

	const [isOpen, setOpen] = useState(false);

	const showModal = () => {
		setOpen(true);
	}

	const handleClose = () => {
		setOpen(!isOpen);
	}

	const style = {
      position: 'absolute',
      top: '50%',
      left: '57%',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

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

    useEffect(()=>{
        // here the data for each review on the map will be pulled in
    })

	// **** TO GRAB USERS FROM SERVER AND STORE WITH A STATE **** //
    const [serverData, setServerData] = useState([
        {
            id: 1,
            name: "KFC Beckton",
            address: "Unit 6, Gateway Retail Park, 8 Claps Gate Ln, Beckton E6 6LG",
            ave_rating: 4,
            type_food: "takeaway",
            geometry: {
	            location: {
	                lat: 51.5217103,
	                lng: 0.0699351
	            },
            },
            reviews: [
                {
                    title: "Was good",
                    body: "Went after football, hit the spot",
                    rating: 5
                },
                {
                    title: "Was decent",
                    body: "Went when I burnt my dinner, was OK",
                    rating: 3
                }
            ]
        },
        {
            id: 2,
            name: "Creams Beckton",
            address: "Unit 4B, Gateway Retail Park, 8 Claps Gate Ln, London E6 6LG",
            ave_rating: 3,
            type_food: "takeaway",
            geometry: {
                location: {
                    lat: 51.521283,
                    lng: 0.0687208
                },
            },
            reviews: [
                {
                    title: "Was alright",
                    body: "Hella sugary",
                    rating: 2
                },
                {
                    title: "Was decent",
                    body: "Went when I burnt my dinner, was OK",
                    rating: 4
                }
            ]
        },
        {
            id: 3,
            name: "Subway Beckton",
            address: "Unit 4C Gateway Retail Park Unit 4C, London E6 6LG",
            ave_rating: 5,
            type_food: "takeaway",
            geometry: {
                location: {
	                lat: 51.5212826,
	                lng: 0.0621547
                },
            },
            reviews: [
                {
                    title: "Banging",
                    body: "Bosswoman even gave me free cookies",
                    rating: 5
                },
                {
                    title: "Banging again",
                    body: "7 golden letters",
                    rating: 5
                }
            ]
        }
    ]);

	// **** TO DISPLAY PARAMS IN URL BROWSER **** //
    const { search } = window.location;

    const query = new URLSearchParams(search).get("search"); // grab the params from the search bar

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
                restaurantName: result.name.tolowerCase(),
                restaurantAddress: result.address.tolowerCase(),
				restaurantType_food: result.type_food.toLowerCase(),
				// will have to go through array of keywords and types of food, add them to results object
            }
            return (
                // return the data objects that include the query in any of their fields
                resultInfo.restaurantName.includes(query) ||
                resultInfo.restaurantAddress.includes(query) ||
                resultInfo.restaurantType_food.includes(query)
            )
        });
    };

	// an array object is the return of the filterResults function
    const filteredResults = filterResults(serverData, searchQuery);

	// ***** FOR MODAL LOGIC ****** //
	// for the modal reducer
	const [state, dispatch] = useReducer(SearchResultReducer, initialState);

    return <div className="pageContent">
				<div className="buttonContainer">
					<Button type="primary" onClick={showModal} style={{ position: "relative", top: "40%", borderRadius: "7px", }}>
					    Click here to add a review
					</Button>
					<Modal
					    onClose={handleClose}
					    open={isOpen}
					    aria-labelledby="Leave a review"
					    aria-describedby="Modal box to leave a review of a restaurant recently visited"
					>
					    <Box sx={style}>
					        <AddRestaurant handleClose={handleClose}/>
					    </Box>
					</Modal>
				</div>
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
    </div>
}

export default ReviewsOverview;