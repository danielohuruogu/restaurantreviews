//** React imports
import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';


import { MapParams } from '../Components/Reusables/MapsDataAndFunctions.jsx';
import { getData } from '../Adapters/mapdata.js';
import { getAllShops } from '../Adapters/client.js';

import ModalWrapper from '../Components/ModalWrapper.jsx';
import AddReviewForm from '../Components/AddReviewForm.jsx';
import MapsWrapper from '../Components/Reusables/MapsWrapper.jsx';
import MapComponent from '../Components/Reusables/MapComponent.jsx';
import Chicken from './../Images/fried-chicken.png';

import SearchBar from '../Components/SearchBar';

import Table from '../Components/Reusables/Table.jsx';
import TableComponent_Result from '../Components/TableComponent_Result.jsx';

import '../Styles/MainPage.css';

function MainPage() {

	const grabShopData = () => {
		getAllShops()
		.then(res => res.json())
		.then(data => {
			console.log(data);
// 			setServerData(data);
		}).catch(err => {
			console.log(err.response)
			err.response.json().then(res=> {
				console.log(res);
			})
		})

	}
    //******************** FOR THE SEARCH + FILTER FUNCTION *******************//
	// **** TO GRAB USERS FROM SERVER AND STORE WITH A STATE **** //
    const [serverData, setServerData] = useState([]);

    useEffect(()=>{
        // here the data for each review on the map will be pulled in
		setServerData(getData())
		grabShopData();
    }, [serverData])

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
            // changing all the results into lowercase text
            let type_foodLowerCaseArray = [];
            type_foodLowerCaseArray.push(result.type_food.forEach(word => word.toLowerCase()));

            const resultInfo = {
                // for each data object that comes through, make the info lower-case
                name: result.name.toLowerCase(),
                address: result.address.toLowerCase(),
				type_food: type_foodLowerCaseArray,
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
        <div className="addShopContainer">
			<ModalWrapper
				RenderComponent={AddReviewForm}
				incButton={true}
				displayData={serverData}
				btnText="Add a new review"
				modalStyleClassName={'modalContainer addRes'}
				/>
		</div>
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