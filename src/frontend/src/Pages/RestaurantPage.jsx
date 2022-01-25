import React from 'react';

import { useParams } from 'react-router-dom';
import { getSingleData } from '../Adapters/mapdata.js';

import MapsWrapper from '../Components/Reusables/MapsWrapper.jsx';
import MapComponent from '../Components/Reusables/MapComponent.jsx';
import Bucket from '../Images/fried-chicken-bucket.png';

import UpdateShopForm from '../Components/UpdateShopForm.jsx';
import ModalWrapper from '../Components/ModalWrapper.jsx';

import Table from '../Components/Reusables/Table.jsx';
import TableComponent_Review from '../Components/TableComponent_Review.jsx';

import Controls from '../Components/Reusables/Controls.jsx';

import '../Styles/RestaurantPage.css';

function RestaurantPage () {

	let params = useParams();

	let restaurantId = parseInt(params.restaurantId, 10);
	// will need to be a different function to grab data from the server on loading the page
	// may have to be a useEffect for grabbing just one piece of info
	let restaurantData = getSingleData(restaurantId);

	const { center } = restaurantData.geometry.location;

	const zoom = 15;

	return(
	<div className="restaurantPage">
		<div className="restaurantInfo">
			<div className="summary">
				<h2>{restaurantData.name}</h2>
				<h2>{restaurantData.address}</h2>
				<Controls.Rating readOnly readOnlyValue={restaurantData.ave_rating} />
			</div>
			<div className="updateModal">
				<ModalWrapper
					RenderComponent={UpdateShopForm}
					incButton={true}
					btnText="Update shop"
					modalStyleClassName={'modalContainer updateShop'}
					/>
			</div>

		</div>
		<div className="shopMapContainer">
			<MapsWrapper
		        center={center}
		        zoom={zoom}
		        ComponentToRender={MapComponent}
		        DataToDisplay={restaurantData}
		        url={Bucket}
		        style={{
		            height: "95%",
		            position: "relative",
		            margin: "2%",
		            }}
		        />
		</div>
		<div className="reviewContainer">
			<h2>Reviews</h2>
			<Table
				data={restaurantData.reviews}
                RenderComponent={TableComponent_Review}
                useHeader={false}
                containerStyle={{
                    height: "95%",
                }}
				/>
		</div>
	</div>
	)
}

export default RestaurantPage