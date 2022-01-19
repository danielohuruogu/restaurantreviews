import React, { useReducer } from 'react';
import { Reducer, initialState } from '../Contexts/Reducer.js'

export function Table(props) {
	const { data, RenderComponent, useHeader, headerInfo=null, redux=null, ...other } = props

	return const [state, dispatch] = useReducer(Reducer, initialState)

	// will have some logic to decide what to do if a header is wanted
	// headerInfo will be an object with data regarding what they want the header to be like
	/*  example: {
		columns: int,
		columnNames: ["name","rating","address"]
	}
	*/
	//https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
	var columnHeaders = [];

	if (headerInfo) {
		const { noColumns, columnNames } = headerInfo
		for (let i=0; i < noColumns; i++) {
			columnHeaders.push(
				<div className="columnHeader">
					{columnNames[i]}
				</div>
			)
		}
	} else {
		columnHeaders.push(<div>NO HEADER INFO GIVEN</div>)
	}

	return (
		<div className="container">
			{useHeader && (
			<div className="header">
				{columnHeaders}
            </div>
			)}
			<div className="overflow-content">
			{data.length > 0 ? (data.map((d, index) => {
				return (
					<RenderComponent
						key={d.id}
						d={d}
						index={index}
						{...(redux && {
							state={state}
	                        dispatch={dispatch}
						})}
						/>
				)}
				)) : (
					<div className="subContainer even">
						<p className="noResults">No results</p>
					</div>
				)}
			</div>
		</div>
	)
}