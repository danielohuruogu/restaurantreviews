import React, { useState, useEffect } from 'react';

import { useForm, Form } from './useForm.jsx';

import { MapParams } from '../Components/Reusables/MapsDataAndFunctions.jsx';
import { updateShopAndCollectionOrAddShop, addReview } from '../Adapters/client.js';

import MapsWrapper from '../Components/Reusables/MapsWrapper';
import SearchMap from '../Components/SearchMap.jsx';

import Controls from './Reusables/Controls.jsx';

import '../Styles/AddReviewForm.css'

export default function AddReviewForm(props) {

	const { payload } = props
	/// **** INITIAL VALUES AND STATES

	const initialShopValues = {
        shopName:"",
        shopAddress:"",
        postCode:"",
		type_of_food: [],
    }

    const initialReviewValues = {
        reviewTitle: "",
        reviewBody: "",
        keywords: [],
        dateVisited: new Date(),
        rating: 0,
    }

	const shopFormSec = useForm(initialShopValues);
	const reviewFormSec = useForm(initialReviewValues);

	const [ matchedValue, setMatchedValue ] = useState({
// 		id: 0,
// 		shopName: "",
// 		shopAddress: "",
// 		geometry: {
// 			location: {
// 				lat: 0,
// 				lng: 0,
// 			},
// 		},
// 		postcode: "",
// 		type_food: []
	});

	const [addressState, setAddressState] = useState();

	const mapData = MapParams();
    const { params } = mapData[0];

	// TO GRAB THE FORMATTED ADDRESS FROM GOOGLE MAPS AND PUT IT IN THE FORM,
	// TO MAKE SURE ACCURATE ADDRESSES ARE SAVED TO THE DATABASE

	// for matching post code regex
	// from https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom
	var regex = /([A-Z]?\d(:? \d[A-Z]{2})?|[A-Z]\d{2}(:? \d[A-Z]{2})?|[A-Z]{2}\d(:? \d[A-Z]{2})?|[A-Z]{2}\d{2}(:? \d[A-Z]{2})?|[A-Z]\d[A-Z](:? \d[A-Z]{2})?|[A-Z]{2}\d[A-Z](:? \d[A-Z]{2})?),\s*UK$/gm;

	useEffect(() => {
		if (addressState) {
  			console.log(addressState)
  			let addressString = addressState.formatted_address;
  			let startOfPostcode = addressString.search(regex);
  			let shortenedString = addressString.substring(startOfPostcode);
  			let postCodeFromAddress = shortenedString.split(",",1)[0];
  			console.log(postCodeFromAddress);

			shopFormSec.setValues({
				...shopFormSec.values,
				shopAddress: addressString,
				postCode: postCodeFromAddress
			})
		}
		console.log(shopFormSec.values)
        console.log(reviewFormSec.values)
        console.log(matchedValue);
	}, [
	addressState,
//  matchedValue,
//  shopFormSec,
//  reviewFormSec
	]);

	const resetSections = () => {
		shopFormSec.resetForm();
        reviewFormSec.resetForm();
	}

	const submittedFormValues = [
		shopFormSec.values,
		reviewFormSec.values
	]

	const submitForm = (e) => {
		e.preventDefault()
// 		console.log(JSON.stringify(submittedFormValues,null,2));
		console.log(submittedFormValues);
		updateShopAndCollectionOrAddShop(submittedFormValues)
		resetSections()
	};

	return (
		<Form onSubmit={submitForm} className="formLayout">
			<div className="summaryFormArea">
				<label><strong>Pick an existing shop or leave a review for a new one</strong></label>
				<Controls.AutoCompleteInput
					name="shopName"
					shopOptions={payload}
					setMatchedValue={setMatchedValue}
					values={shopFormSec.values}
					setValues={shopFormSec.setValues}
					onChange={shopFormSec.handleInputChange}
					style={{ width: '90%'}}
				    />
				<Controls.Input
					name="shopAddress"
					value={shopFormSec.values.shopAddress}
					label="Shop Address"
					onChange={shopFormSec.handleInputChange}
					error={shopFormSec.errors.shopAddress}
					/>
				<Controls.TagsInput name="type_of_food" stateItems={shopFormSec.values} setStateItems={shopFormSec.setValues}/>
            </div>
            <MapsWrapper
	            center={params.center}
	            zoom={params.zoom}
	            ComponentToRender={SearchMap}
	            style={{
	                height: "100%",
	                gridArea: "map",
	            }}
	            setAddressState={setAddressState}
	            />
            <div className="reviewFormArea">
                <div>
            	    <hr/>
            	</div>
                <div className="reviewSummary">
                    <div className="reviewContent">
			            <Controls.Input
			                name="reviewTitle"
			                value={reviewFormSec.values.reviewTitle}
			                label="Title"
			                onChange={reviewFormSec.handleInputChange}
			                error={reviewFormSec.errors.reviewTitle}
			                style={{
			                    fontSize: "0.8rem",
			                }}
			                />
		                <Controls.TextArea
                            name="reviewBody"
                            value={reviewFormSec.values.reviewBody}
                            aria-label="Section to leave a review"
                            onChange={reviewFormSec.handleInputChange}
                            minRows={3}
                            placeholder="What did you think?"
                            style={{
                                width: "100%",
                                height: "50%",
                                borderColor: "rgb(190,190,190)",
                                borderRadius: "3px"
                            }}
                            />
		            </div>
		            <div className="reviewInfo">
		                <Controls.DatePicker
		                    name="dateVisited"
	                        values={reviewFormSec.values}
	                        setValues={reviewFormSec.setValues}
	                        />
						<Controls.DynRating
							name="rating"
						    values={reviewFormSec.values}
						    setValues={reviewFormSec.setValues}
						    />
						<Controls.TagsInput
							name="keywords"
							stateItems={reviewFormSec.values}
							setStateItems={reviewFormSec.setValues}
							/>
		            </div>
	            </div>
	            <div className="formSubmit">
	                <div>
			            <Controls.MButton onClick={submitForm} text="Submit" type="submit" />
			            <Controls.MButton color="secondary" onClick={resetSections} text="Reset"/>
		            </div>
	            </div>
            </div>
		</Form>
	)
}

	/// ****  BELOW IS CODE TO HELP THE USER EXPERIENCE WITH THE FORM

	// TO GRAB A VALUE FROM THE AUTOCOMPLETE AND FILL IN THE REST OF THE FORM, TO
	// PREVENT DUPLICATES IN THE DATABASE
// 	useEffect(() => {
// 		if (matchedValue) {
// 			if (matchedValue.address) {
// 				console.log(matchedValue)
// // 				setValues({
// // 					...values,
// // 					address: matchedValue.address
// // 				})
// 			}
// // 			if (matchedValue.type_food) {
// // 				setTypeFoodTags(matchedValue.type_food)
// // 			}
// 		}
// 	}, [matchedValue]);

	// TO RESET THE FORM IF THE AUTOSELECT OPTION IS CLEARED - IF THE USER WANTS TO
	// SELECT SOMETHING ELSE
// 	useEffect(() => {
// 		if (!values.name.length) {
// 			setValues({
// 				...values,
// 				address: '',
// 			});
// 			setTypeFoodTags([]);
// 		}
// 	}, [values.name.length]);

// 	const validate = (values) => {
// 		let temp = {};
// 		for (field of values)
// 		temp.name = values.name ? "" : "Shop name required"
// 		temp.address = values.address ? "" : "Shop address required"
// 		temp.reviewTitle = values.reviewTitle ? "" : "Review title required"
// 		temp.reviewBody = values.reviewBody ? "" : "Review required"
// 		setErrors({
// 			...temp,
// 		});
//
// 		// return an object with the values found in temp
// 		return Object.values(temp)
// 		// returns a boolean if every item in an array passes the test laid out
// 		// in this case, returns true if there are only empty strings, that the
// 		// form is valid
// 			.every(x => x === "");
// 	};