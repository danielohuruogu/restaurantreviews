import React from 'react';
import './ReviewContainer.css';

const ReviewContainer = ({ data, RenderComponent }) => {

	return (
		<div className='container'>
			<div className='overflow-content'>
			{/* if there's data in filtered posts, a new row is generated with it's info. if no data, 'no matches' is returned */}
			{data.length > 0 ? (data.map((d, index) => {
					return (
						<RenderComponent
							key={d.id}
							d={d}
							index={index}
							/>
						);
					})
				) : (
					<div className='subContainer even'>
						<p className='noMatch'>No reviews yet</p>
					</div>
			)}
			</div>
		</div>
	);
};

export default ReviewContainer;