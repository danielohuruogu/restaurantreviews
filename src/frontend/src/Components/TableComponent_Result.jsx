import React from 'react';

import { SELECT_PD, CLEAR_SELECTION } from './SearchResultTypes';

import * as FaIcons from 'react-icons/fa';
import {RiRadioButtonLine} from 'react-icons/ri';
import Modal from 'react-modal';
import SearchResultModal from './SearchResultModal';
import {BsMoon} from 'react-icons/bs';

import './SearchResult.css';

const TableComponent_Result = ({ d, index, dispatch, state }) => {
	let userClass;
	if (index % 2 === 0) {
		userClass = 'subContainer result even';
	} else if (index % 2 !== 0) {
		userClass = 'subContainer result odd';
	}

	function clearSelection() {
		dispatch({ type: CLEAR_SELECTION });
	}
	if (!d) {
		return null;
	}

	const { selection } = state;

	Modal.setAppElement('#root');

	return (
    <>
      {/* used to send payload to reducer hook on card click */}
      {/* rendering each result */}
        <div
            className={userClass}
            onClick={() => dispatch({ type: SELECT_PD, payload: d })}
            >
            <div className='gridCell'>
                {d.name ? (
                <span>
	                <strong>
	                    {d.name}
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
                    <em>{d.ave_rating}</em>
                </p>
            </div>
            <div className='gridCell'>
                <p>
                    <em>{d.address}</em>
                </p>
            </div>
            <div className='gridCell'>
				<span>
					{d.type_food}
				</span>
            </div>
            <div className='gridCell'>
				<p>
					<em>6/1/22</em>
				</p>
	        </div>
        </div>
        <Modal
	        overlayClassName={'searchModalOverlay'}
	        className={'searchModalContainer'}
	        isOpen={!!selection}
	        onRequestClose={clearSelection}
	      >
	        <SearchResultModal
	          key={selection?.id}
	          closeModal={clearSelection}
	          d={selection}
	          dispatch={dispatch}
	            />
        </Modal>
    </>
  );
};

export default SearchResult;