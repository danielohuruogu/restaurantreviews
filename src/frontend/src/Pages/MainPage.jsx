//** React imports
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import AddRestaurant from './AddRestaurant.jsx';

import { MapParams } from '../Components/Reusables/MapsDataAndFunctions.jsx';
import { getData } from '../Adapters/mapdata.js';

import ModalWrapper from '../Components/ModalWrapper.jsx';
import MapsWrapper from '../Components/Reusables/MapsWrapper.jsx';
import MapComponent from '../Components/Reusables/MapComponent.jsx';
import Chicken from './../Images/fried-chicken.png';

import SearchBar from '../Components/SearchBar';

import Table from '../Components/Reusables/Table.jsx';
import TableComponent_Result from '../Components/TableComponent_Result.jsx';

import '../Styles/MainPage.css';

function MainPage() {

// 	//******************** TO DISPLAY THE MAIN MAP *******************//
//
// 	const center = {
// 		lat: 51.5087908,
// 		lng: -0.1289414
// 	}
//
// 	const zoom = 9;
//
//     // in this file will be the filtering function for the searching
//     // can pass the filtered data for display through to the review map
//     // - this was done by me on the Community page for the app
//
//     const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;
//
//     function render(status) {
//         if (status === Status.LOADING) return <h3>{status} ..</h3>;
//         if (status === Status.FAILURE) return <h3>{status} ...</h3>;
//         return null;
//     };

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

    const mapData = MapParams();
    const { params } = mapData[1];

    return (
    <div className="pageContent">
		<ModalWrapper
			RenderComponent={AddRestaurant}
			incButton={true}
			displayData={serverData}
			/>
		<div className="reviewMapContainer">
			<MapsWrapper
				center={params.center}
				zoom={params.zoom}
				ComponentToRender={MapComponent}
				dataToDisplay={filteredResults}
				url={Chicken}
				style={{
					height: "95%",
					width:"90%",
					position: "relative",
					right: "2%"}}
					/>
		</div>
		<div className="reviewSearchContainer">
			<SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}/>
			<Table
			    data={filteredResults}
			    RenderComponent={TableComponent_Result}
			    useHeader={true}
			    headerInfo={{
			        noColumns: 3,
			        columnNames: ["Name", "Address", "Date Visited"]
			    }}
			    redux
				/>
		</div>
		<Outlet />
    </div>
)}

export default MainPage;