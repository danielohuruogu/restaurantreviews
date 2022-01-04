import React from 'react';

import MapOfRestaurants from './MapOfRestaurants';
import UserList from './UserList';
import AddRestaurant from './AddRestaurant/AddRestaurant';

function MainPage() {

	return <div className="example">
		<div>
			<MapOfRestaurants/>
		</div>
		<div>
			<AddRestaurant/>
		</div>
		<div>
			<UserList/>
		</div>
	</div>
}

export default MainPage;