import React from 'react';

import { SELECT_PD, CLEAR_SELECTION } from '../Contexts/ReducerTypes';

// import Modal from 'react-modal';
import ReduxModalWrapper from './ReduxModalWrapper';
import ResultModal from './ResultModal';

import '../Styles/TableComponents.css';

const TableComponent_Result = (props) => {

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
            </div>
            <div className='gridCell'>
                <p>
                    <em>{data.ave_rating}</em>
                </p>
            </div>
            <div className='gridCell'>
                <p>
                    <em>{data.address}</em>
                </p>
            </div>
            <div className='gridCell'>
				<span>
					{data.type_food}
				</span>
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
            />
{/*         <Modal */}
{/* 	        overlayClassName={'searchModalOverlay'} */}
{/* 	        className={'searchModalContainer'} */}
{/* 	        isOpen={!!selection} */}
{/* 	        onRequestClose={clearSelection} */}
{/* 	      > */}
{/* 	        <SearchResultModal */}
{/* 	          key={selection?.id} */}
{/* 	          closeModal={clearSelection} */}
{/* 	          d={selection} */}
{/* 	          dispatch={dispatch} */}
{/* 	            /> */}
{/*         </Modal> */}
    </>
  );
};

export default TableComponent_Result;