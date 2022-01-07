import React from 'react';

import { SELECT_PD, CLEAR_SELECTION } from './SearchResultTypes';

import * as FaIcons from 'react-icons/fa';
import {RiRadioButtonLine} from 'react-icons/ri';
import Modal from 'react-modal';
import SearchResultModal from './SearchResultModal';
import {BsMoon} from 'react-icons/bs';

import './SearchResult.css';

const SearchResult = ({ d, dispatch, state, index }) => {
	let userClass;
	if (index % 2 === 0) {
		userClass = 'subContainer result even';
	} else if (index % 2 !== 0) {
		userClass = 'subContainer result odd';
	}
//   if (d.username === localStorage.getItem('loggedin_username')) {
//     userClass = userClass + ' user';
//   }

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
        {/* ${ index+1 === d.length && "last" } */}
            <div className='gridCell'>
{/*           {d.is_online || (localStorage.getItem("online") && d.id===parseInt(localStorage.getItem("loggedin_id"))) ? ( */}
{/*             <RiRadioButtonLine color="green"></RiRadioButtonLine> */}
{/*           ):(<BsMoon color="orange" fillColor="orange"></BsMoon>)} */}
                {d.name ? (
                <span>
	                <strong>
	                    {d.name}
	{/*                 {localStorage.getItem('loggedin_username') == d.username && ( */}
	{/*                   <span className="userProf">*</span> */}
	{/*                 )} */}
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
	        // style={customStyles}
	        isOpen={!!selection}
	        onRequestClose={clearSelection}
	        transparent={true}
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