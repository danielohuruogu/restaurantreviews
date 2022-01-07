import React, { useState } from 'react';

import * as FaIcons from 'react-icons/fa';
import {RiRadioButtonLine} from 'react-icons/ri';

import './Review.css';
import Avatar from './../../Images/avatar-icon.png';

const Review = ({ d, index, key }) => {

	let userClass;
	if (index % 2 === 0) {
		userClass = 'subContainer result even';
	} else if (index % 2 !== 0) {
		userClass = 'subContainer result odd';
	}

	// logic inspired by here
    //https://chayanit-chaisri.medium.com/react-create-a-show-more-less-button-aa0e9cd0f927
	const [showMore, setShowMore] = useState(false);

	const isLongReview = () => {
		return (d.body.length > 100 ? true : false);
	};

	return (
    <>
        <div className={userClass}>
            <div className="user">
	            <div className="userPicture">
	                <img
	                    className="userAvatar"
	                    alt="avatar"
	                    src={Avatar}
	                    />
	            </div>
                <div className="userName">
                {d.author ? (
	                <span>
		                <strong>
		                    {d.author}
		                </strong>
	                </span>
	                ) : (
	                <span>
	                    <em>
	                        No name available
	                    </em>
	                </span>
                )}
                </div>
            </div>
            <div className="review">
                <p><em>{d.rating}</em></p>
                <h2>{d.title}</h2>
                {/* if showMore is true, show the body
                if false, show the button to turn it on */}
                <p>{
                    isLongReview() ?
                        (showMore ? d.body : `${d.body.substring(0,100)}...`) :
                        d.body
                }</p>
            </div>
            <div className="date-btn">
                <p className="date"><em>{d.date_made}</em></p>
                <button
                    className={ isLongReview() ? "showMoreBtn" : "notThere"}
                    onClick={() => {
                        setShowMore(!showMore)
                    }}
                    >
                    {showMore ? "Show less" : "Show more"}
                </button>
            </div>
        </div>
    </>
  );
};

export default Review;