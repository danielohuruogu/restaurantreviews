import React, { useReducer } from 'react';
import { Reducer, initialState } from '../../Contexts/Reducer.js'

import '../../Styles/Table.css'

function Table(props) {
	const { data, RenderComponent, useHeader, headerInfo=null, redux=null, containerStyle=null, headerStyle=null, headingStyle=null, ...other } = props

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
                    <div
                        {...(headingStyle && {
                            headingStyle:true,
                            style:headingStyle,
                        })}
                        className="heading"
                        >
                       {columnNames[i]}
                    </div>
                )
            }
        // if no info for the header has been provided
		} else {
			columnHeaders.push(<div className="heading">NO HEADER INFO GIVEN</div>)
		}
	}

	return (
		<div
			{...(containerStyle && {
				containerStyle:true,
				style:containerStyle,
			})}
			className={ containerStyle ? null : "container" }>
			{useHeader &&
			<div
				{...(headerStyle && {
					headerStyle:true,
					style:headerStyle,
				})}
				className={ headerStyle ? null : "subContainer result header" }>
				{columnHeaders}
			</div>
			}
			<div className="overflow-content">
			{data.length > 0 ? (data.map((d, index) => {
				return (
					<RenderComponent
						key={index}
						data={d}
// 						index={index}
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