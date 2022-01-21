import React, { useState } from 'react';

import * as FaIcons from 'react-icons/fa';
import {RiRadioButtonLine} from 'react-icons/ri';

import '../Styles/TableComponents.css';
import Avatar from '../Images/avatar-icon.png';

import Controls from './Reusables/Controls.jsx';

export default function TableComponent_Review(props) {

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

	var keywords_string = "";
    for (let i=0; i < data.keywords.length; i++){
        if (i === data.keywords.length-1) {
            keywords_string += data.keywords[i]
        } else {
        keywords_string += data.keywords[i] + ", "
        }
    }

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
                <Controls.Rating readOnly readOnlyValue={data.rating}/>
                <h2>{data.title}</h2>
                {/* if showMore is true, show the body
                if false, show the button to turn it on */}
                {isLongReview() ?
                        (showMore ?
	                        (
	                            <div>
		                            <p>{data.body}</p>
		                            <p>{keywords_string}</p>
	                            </div>
	                        ) : (<p>{data.body.substring(0,100)}...</p>)
                        ) : (
	                        <div>
		                        <p>{data.body}</p>
		                        <p>{keywords_string}</p>
	                        </div>
                        )
                }
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