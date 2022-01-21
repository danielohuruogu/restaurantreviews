import React, { useReducer } from 'react';
import { Reducer, initialState } from '../../Contexts/Reducer.js'

import '../../Styles/Table.css'

function Table(props) {
	const { data, RenderComponent, useHeader, headerInfo=null, redux=null, ...other } = props

	const [state, dispatch] = useReducer(Reducer, initialState)

	// will have some logic to decide what to do if a header is wanted
	// headerInfo will be an object with data regarding what they want the header to be like
	/*  example: {
		columns: int,
		columnNames: ["name","rating","address"]
	}
	*/
	//https://stackoverflow.com/questions/22876978/loop-inside-react-jsx
	var columnHeaders = [];

	// if a header is wanted
	if (useHeader) {
		// if info for the header has been provided
		if(headerInfo) {
			const { noColumns, columnNames } = headerInfo
            for (var i=0; i < noColumns; i++) {
                columnHeaders.push(
                    <div className="header">
                        <p>{columnNames[i]}</p>
                    </div>
                )
            }
        // if no info for the header has been provided
		} else {
			columnHeaders.push(<div className="header">NO HEADER INFO GIVEN</div>)
		}
	}

	return (
		<div className="container">
			{useHeader &&
			<div className="subContainer headers">
				{columnHeaders}
			</div>
			}
			<div className="overflow-content">
			{data.length > 0 ? (data.map((d, index) => {
				return (
					<RenderComponent
						key={d.id}
						data={d}
						index={index}
						{...(redux && {
							redux:true,
							state:state,
	                        dispatch:dispatch
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

export default Table;