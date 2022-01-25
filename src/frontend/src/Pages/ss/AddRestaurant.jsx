import React, { useState } from 'react';

import FormSection from '../Components/FormSection.jsx';

import '../Styles/AddRestaurant.css';

function AddRestaurant(props) {
	           /*  addressInfo={addressState}
	                    <div>
	           // 	  *  </div> *
*/

	const { displayData } = props;

    return <>
	        <FormSection
	            data={displayData}
	            />
    </>
}

export default AddRestaurant;