import React from 'react';
import '../Styles/ResultModal.css';

import { Link, Outlet } from 'react-router-dom';

const ResultModal = (props) => {

	const { payload } = props
	if (!payload) {
		return null;
	}

	return (
	<>
		<div className="restaurantInfo">
			<div className="name">
				<h1>{payload.name}</h1>
			</div>
			<div className="info">
				<h3>{payload.type_food}</h3>
				<h2>{payload.ave_rating}</h2>
			</div>
		</div>
		{/* will check if there are reviews. If there are some, will
            display the title and body of the last review to be
            added to the array
        */}
        {payload.reviews.length > 0 ?
        (<>
            <div className="subheader">
        		<h2><em>Latest review:</em></h2>
        	</div>
        	<div className="review">
	            <div className="latestReview">
	                <h3>{payload.reviews[payload.reviews.length -1].title}</h3>
	                <p>{payload.reviews[payload.reviews.length -1].body.substring(0,30)}...</p>
	            </div>
	            <div className="linkBtn">
	                <p><strong><Link to={"restaurants/"+payload.id}>See more</Link></strong></p>
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

export default ResultModal;