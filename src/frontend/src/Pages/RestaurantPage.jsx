import React from 'react';

import { useParams } from 'react-router-dom';
import { getSingleData } from '../Adapters/mapdata.js';

import MapsWrapper from '../Components/Reusables/MapsWrapper.jsx';
import MapComponent from '../Components/Reusables/MapComponent.jsx';

import Table from '../Components/Reusables/Table.jsx';
import TableComponent_Review from '../Components/TableComponent_Review.jsx';

import Bucket from '../Images/fried-chicken-bucket.png';

import '../Styles/RestaurantPage.css';

function RestaurantPage () {

	let params = useParams();

	let restaurantId = parseInt(params.restaurantId, 10);
	// will need to be a different function to grab data from the server on loading the page
	// may have to be a useEffect for grabbing just one piece of info
	let restaurantData = getSingleData(restaurantId);

	const { center, zoom } = restaurantData.geometry.location;

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
			<MapsWrapper
				center={center}
				zoom={zoom}
				ComponentToRender={MapComponent}
				DataToDisplay={restaurantData}
				url={Bucket}
				style={{
	                height: "95%",
	                width:"40%",
	                position: "relative",
	                }}
					/>
		</div>
		<div className="reviewContainer">
			<h1>Reviews</h1>
			<Table
				data={restaurantData.reviews}
                RenderComponent={TableComponent_Review}
                useHeader={false}
				/>
		</div>
	</div>
	)
}

export default RestaurantPage