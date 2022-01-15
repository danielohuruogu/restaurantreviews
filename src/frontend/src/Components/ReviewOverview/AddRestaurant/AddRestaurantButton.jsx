import React, { useState, useEffect, useRef } from 'react'

import Button from '@mui/material/Button';
import Modal from 'react-modal';
import Box from '@mui/material/Box';

import { Wrapper, Status } from "@googlemaps/react-wrapper";

import MapSection from './MapSection.jsx';
import FormSection from './FormSection.jsx';
import ReviewForm from './ReviewForm.jsx';

import './AddRestaurant.css';


function AddRestaurantButton({ serverData }) {
	//******************** FOR THE 'ADD A REVIEW' BUTTON + MODAL *******************//
	// for grabbing the maps info
    const [addressState, setAddressState] = useState();
	const [isOpen, setOpen] = useState(false);

	const style = {
      position: 'absolute',
      top: '50%',
      left: '57%',
      transform: 'translate(-50%, -50%)',
      width: '80vw',
      height: '75vh',
      bgcolor: 'background.paper',
      boxShadow: 24,
      p: 4,
    };

    const showModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    // For the maps wrapper

    const apiKey = `${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`;

    function render(status) {
        if (status === Status.LOADING) return <h3>{status} ..</h3>;
        if (status === Status.FAILURE) return <h3>{status} ...</h3>;
        return null;
    };

    // props for MapSection
    const center = {
        lat: 51.5255,
        lng: 0.0352
    }
    const zoom = 11;


	return (
		<div>
            <Button type="primary" onClick={showModal}>
                Click here to add a review
            </Button>
            <Modal
                onRequestClose={handleClose}
                isOpen={isOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                parentSelector={()=> document.querySelector('#root')}>
{/* 				<Box sx={style}> */}
					<div className="addRestaurantSection">
						<h1>Leave a review</h1>
						<Button onClick={handleClose}>
							X
						</Button>
                        <FormSection addressInfo={addressState}
//                             handleClose={handleClose}
                            serverData={serverData}/>
{/* 						<ReviewForm /> */}
                        <Wrapper apiKey={apiKey} render={render} libraries={["places"]}>
                            <MapSection center={center} zoom={zoom} setAddressState={setAddressState}/>
                        </Wrapper>
                    </div>
{/* 				</Box> */}
            </Modal>
        </div>
	)
}

export default AddRestaurantButton;