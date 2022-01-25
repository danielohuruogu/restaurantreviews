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
    for (let i=0; i < data.type_of_food.length; i++){
        if (i === data.type_of_food.length-1) {
            type_food_string += data.type_of_food[i]
        } else {
        type_food_string += data.type_of_food[i] + ", "
        }
    }

	return (
    <>
      {/* used to send payload to reducer hook on card click */}
      {/* rendering each result */}
        <div
            className={resultClass}
            onClick={() => dispatch({ type: SELECT_PD, payload: data })}
            >
            <div className='gridCell'>
                {data.name ? (
                <span>
	                <strong>
	                    {data.name}
	                </strong>
                </span>
                ) : (
                <span>
                    <em>
                        No name available
                    </em>
                </span>
                )}
                <Controls.Rating readOnly readOnlyValue={data.ave_rating}/>
            </div>
            <div className='gridCell'>
                <p>{data.address}</p>
                <p><em>{type_food_string}</em></p>
            </div>
            <div className='gridCell'>
				<p>
					<em>6/1/22</em>
				</p>
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