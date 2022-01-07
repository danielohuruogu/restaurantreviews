import React from 'react';
import './SearchResultModal.css';

import { Link, Outlet } from 'react-router-dom';

import * as FaIcons from 'react-icons/fa';

const SearchResultModal = ({ d: pd }) => {
	if (!pd) {
		return null;
	}

	return (
	<>
		<div className="restaurantInfo">
			<div className="name">
				<h1>{pd.name}</h1>
			</div>
			<div className="info">
				<h3>{pd.type_food}</h3>
				<h2>{pd.ave_rating}</h2>
			</div>
		</div>
		{/* will check if there are reviews. If there are some, will
            display the title and body of the last review to be
            added to the array
        */}
        {pd.reviews.length > 0 ?
        (<>
            <div className="subheader">
        		<h2><em>Latest review:</em></h2>
        	</div>
        	<div className="review">
	            <div className="latestReview">
	                <h3>{pd.reviews[pd.reviews.length -1].title}</h3>
	                <p>{pd.reviews[pd.reviews.length -1].body.substring(0,30)}...</p>
	            </div>
	            <div className="linkBtn">
	                <p><strong><Link to={"restaurants/"+pd.id}>See more</Link></strong></p>
	            </div>
	        </div>
        </>) : (
        <div className="noReviews">
            <h2><strong>No reviews yet</strong></h2>
        </div>
        )}
        <Outlet/>
	</>
	);
};

export default SearchResultModal;