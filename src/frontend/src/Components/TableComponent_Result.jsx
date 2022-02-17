import React from 'react';

import { SELECT_PD, CLEAR_SELECTION } from '../Contexts/ReducerTypes';

import ReduxModalWrapper from './ReduxModalWrapper';
import ResultModal from './ResultModal';

import Controls from './Reusables/Controls.jsx';

import '../Styles/TableComponents.css';

export default function TableComponent_Result(props) {

	const { data, index, state, dispatch } = props

	let resultClass;
	if (index % 2 === 0) {
		resultClass = 'subContainer result even';
	} else if (index % 2 !== 0) {
		resultClass = 'subContainer result odd';
	}

	function clearSelection() {
		dispatch({ type: CLEAR_SELECTION });
	}
	if (!data) {
		return null;
	}

	const { selection } = state;

	var type_food_string = "";
	if (data.typeOfFood) {
	    for (let i=0; i < data.typeOfFood.length; i++){
	        if (i === data.typeOfFood.length-1) {
	            type_food_string += data.typeOfFood[i]
	        } else {
	        type_food_string += data.typeOfFood[i] + ", "
	        }
	    }
    }

    var addressString = Object.values(data.address).join(', ');

	return (
    <>
      {/* used to send payload to reducer hook on card click */}
      {/* rendering each result */}
        <div
            className={resultClass}
            onClick={() => dispatch({ type: SELECT_PD, payload: data })}
            >
            <div className='gridCell'>
                {data.shopName ? (
                <>
	                <p>
		                <strong>
		                    {data.shopName}
		                </strong>
	                </p>
	                <p><em>{type_food_string}</em></p>
                </>
                ) : (
                <span>
                    <em>
                        No name available
                    </em>
                </span>
                )}
            </div>
            <div className='gridCell'>
                <p><strong><em>{addressString}</em></strong></p>
            </div>
            <div className='gridCell'>
				<Controls.FormRating readOnly readOnlyValue={data.averageRating}/>
	        </div>
        </div>
        <ReduxModalWrapper
            RenderComponent={ResultModal}
            reduxSelection={!!selection}
            reduxClearSelection={clearSelection}
            displayData={selection}
            modalStyleClassName={'modalContainer redux'}
            />
    </>
  );
};