import React, { useState } from 'react';

import Avatar from '../Images/avatar-icon.png';
import Controls from './Reusables/Controls.jsx';

import { deleteReview } from '../Adapters/client.js';

import Close from '@mui/icons-material/Close';

import { confirmDialog } from './Reusables/ConfirmDialog';

import '../Styles/TableComponents.css';


export default function TableComponent_Review(props) {

	const { data, index } = props;

	let reviewClass;
	if (index % 2 === 0) {
		reviewClass = 'subContainer review even';
	} else if (index % 2 !== 0) {
		reviewClass = 'subContainer review odd';
	}
	if (index === 0) {
		reviewClass += " first";
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
            <div className="cell user">
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
            <div className="cell reviewAndRating">
                <Controls.Rating readOnly readOnlyValue={data.rating}/>
                <h2 style={{ marginTop: "2%" }}>{data.title}</h2>
                {/* if showMore is true, show the body
                if false, show the button to turn it on */}
                <div className="reviewBody">
                {isLongReview() ?
                        (showMore ?
	                        (
	                        <>
	                            <p>{data.body}</p>
	                            <p><strong><em>{keywords_string}</em></strong></p>
	                        </>
	                        ) : (<p>{data.body.substring(0,100)}...</p>)
                        ) : (
                        <>
	                        <p>{data.body}</p>
	                        <p><strong><em>{keywords_string}</em></strong></p>
	                    </>
                        )
                }
                </div>
            </div>
            <div className="cell date-btn">
				<Close className="deleteIcon" onClick={()=> {
						confirmDialog("Delete review?", () => {
							console.log("deleted review");
							deleteReview(data);
						})
					}}
					/>
                <p className="date"><em>{data.date_made}</em></p>
                <Controls.MButton
                    className={ isLongReview() ? null : "notThere" }
                    variant="text"
                    size="small"
                    onClick={() => {
                        setShowMore(!showMore)
                    }}
                    text={showMore ? "Show less" : "Show more"}
                    />
            </div>
        </div>
    </>
  );
};