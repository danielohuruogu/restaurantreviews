import React, { useState } from 'react';

import * as FaIcons from 'react-icons/fa';
import {RiRadioButtonLine} from 'react-icons/ri';

import '../Styles/TableComponents.css';
import Avatar from '../Images/avatar-icon.png';

const TableComponent_Review = (props) => {

	const { data, index } = props;

	let reviewClass;
	if (index % 2 === 0) {
		reviewClass = 'subContainer review even';
	} else if (index % 2 !== 0) {
		reviewClass = 'subContainer review odd';
	}

	// logic inspired by here
    //https://chayanit-chaisri.medium.com/react-create-a-show-more-less-button-aa0e9cd0f927
	const [showMore, setShowMore] = useState(false);

	const isLongReview = () => {
		return (data.body.length > 100 ? true : false);
	};

	return (
    <>
        <div className={reviewClass}>
            <div className="user">
	            <div className="userPicture">
	                <img
	                    className="userAvatar"
	                    alt="avatar"
	                    src={Avatar}
	                    />
	            </div>
                <div className="userName">
                {data.author ? (
	                <span>
		                <strong>
		                    {data.author}
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
                <p><em>{data.rating}</em></p>
                <h2>{data.title}</h2>
                {/* if showMore is true, show the body
                if false, show the button to turn it on */}
                <p>{ isLongReview() ?
                        (showMore ? data.body : `${data.body.substring(0,100)}...`) :
                        data.body
                }</p>
            </div>
            <div className="date-btn">
                <p className="date"><em>{data.date_made}</em></p>
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

export default TableComponent_Review;