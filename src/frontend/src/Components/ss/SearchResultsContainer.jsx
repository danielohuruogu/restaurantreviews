import React, { useReducer } from 'react';
import './SearchResultsContainer.css';
import { Reducer, initialState } from './SearchReviewsSection/SearchResultReducer';


const SearchResultsContainer = ({ data, RenderComponent }) => {
// here is where the actual fetching from the database is done

// ***** FOR MODAL LOGIC ****** //
	// for the modal reducer
	const [state, dispatch] = useReducer(Reducer, initialState);

	return (
		<div className='container'>
			<div className='subContainer headers'>
				<div className='commTableheader one'>Name</div>
				<div className='commTableheader two'>Rating</div>
				<div className='commTableheader three'>Address</div>
				<div className='commTableheader four'>Type of food</div>
				<div className='commTableheader five'>Date visited</div>
			</div>

			<div className='overflow-content'>
			{/* if there's data in filtered posts, a new row is generated with it's info. if no data, 'no matches' is returned */}
			{data.length > 0 ? (data.map((d, index) => {
					return (
						<RenderComponent
							key={d.id}
							d={d}
							index={index}
							state={state}
							dispatch={dispatch}
							/>
						);
					})
				) : (
					<div className='subContainer even'>
						<p className='noMatch'>No matches 😕 Try something else</p>
					</div>
			)}
			</div>
		</div>
	);
};

export default SearchResultsContainer;