import React from 'react';
import '../Styles/ResultModal.css';

import Controls from './Reusables/Controls.jsx';

import { Link, Outlet } from 'react-router-dom';

export default function ResultModal(props) {

	const { payload } = props
	if (!payload) {
		return null;
	}

	return (
	<div className="modalContent">
		<div className="nameAndReviews">
			<div className="name">
				<h1>{payload.name}</h1>
			</div>
            {payload.reviews.length > 0 ?
            (
            <div className="reviews">
	            <h2><em><strong>Latest review:</strong></em></h2>
	            <h3>{payload.reviews[payload.reviews.length -1].title}</h3>
	            <p>{payload.reviews[payload.reviews.length -1].body.substring(0,30)}...</p>
            </div>
            ) : (
            <div className="noReviews">
	            <h2>No reviews</h2>
            </div>
            )}
        </div>
        <div className="summary">
            <div className="info">
                <h3>{payload.type_food.join(', ')}</h3>
                <Controls.Rating readOnly readOnlyValue={payload.ave_rating} />
            </div>
            {payload.reviews.length > 0 &&
	            <div className="linkBtn">
	                <p><strong><Link to={"restaurants/"+payload.id}>See more</Link></strong></p>
	            </div>
            }
        </div>
        <Outlet/>
	</div>
	);
};