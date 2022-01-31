import React, { useState, useEffect } from 'react';

import { useForm, Form } from './useForm.jsx';

import { MapParams } from '../Components/Reusables/MapsDataAndFunctions.jsx';
import MapsWrapper from '../Components/Reusables/MapsWrapper';
import SearchMap from '../Components/SearchMap.jsx';

import Controls from './Reusables/Controls.jsx';

import '../Styles/AddReviewForm.css'

export default function AddReviewForm(props) {

	const { payload } = props
	/// **** INITIAL VALUES AND STATES
	const initialFValues = {
        id: 0,
        name:"",
        address:"",
		type_of_food: [],
		review: {
			title: "",
			body: "",
			keywords: [],
			dateVisited: new Date(),
			rating: 0,
		},
    }

	const {
		values,
		setValues,
		errors,
		setErrors,
		resetForm,
		handleInputChange,
	} = useForm(initialFValues)

	const [ matchedValue, setMatchedValue ] = useState({
		id: 0,
		name: "",
		address: "",
		ave_rating: 0,
		geometry: {
			location: {
				lat: 0,
				lng: 0,
			},
		},
		postcode: "",
		reviews: [],
		type_food: []
	});

	const [addressState, setAddressState] = useState();

	const mapData = MapParams();
    const { params } = mapData[0];

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

	 // TO GRAB THE FORMATTED ADDRESS FROM GOOGLE MAPS AND PUT IT IN THE FORM,
	 // TO MAKE SURE ACCURATE ADDRESSES ARE SAVED TO THE DATABASE
	useEffect(() => {
		if (addressState) {
  			console.log(addressState)
			setValues({
				...values,
				address: addressState.formatted_address,
			})
		}
	}, [addressState]);

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

	const validate = () => {
		let temp = {};
		temp.name = values.name ? "" : "Shop name required"
		temp.address = values.address ? "" : "Shop address required"
		temp.reviewTitle = values.reviewTitle ? "" : "Review title required"
		temp.reviewBody = values.reviewBody ? "" : "Review required"
		setErrors({
			...temp,
		});

		// return an object with the values found in temp
		return Object.values(temp)
		// returns a boolean if every item in an array passes the test laid out
		// in this case, returns true if there are only empty strings, that the
		// form is valid
			.every(x => x === "");
	};

	const submitForm = (e) => {
		e.preventDefault()
		console.log(JSON.stringify(values,null,2));
		resetForm();
	};

	return (
		<Form onSubmit={submitForm} className="formLayout">
			<div className="summaryFormArea">
				<label><strong>Pick an existing shop or leave a review for a new one</strong></label>
				<Controls.AutoCompleteInput
					options={payload}
					setMatchedValue={setMatchedValue}
					values={values}
					setValues={setValues}
					style={{ width: 100 }}
				    />
				<Controls.Input
					name="address"
					value={values.address}
					label="Shop Address"
					onChange={handleInputChange}
					error={errors.name}
					/>
				<Controls.TagsInput name="type_of_food" stateItems={values} setStateItems={setValues}/>
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
			                value={values.reviewTitle}
			                label="Title"
			                onChange={handleInputChange}
			                error={errors.reviewTitle}
			                style={{
			                    fontSize: "0.8rem",
			                }}
			                />
		                <Controls.TextArea
                            name="reviewBody"
                            value={values.reviewBody}
                            aria-label="Section to leave a review"
                            onChange={handleInputChange}
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
	                        date={values}
	                        setDate={setValues}
	                        />
						<Controls.Rating />
						<div style={{ height: "30%"}}>
                            PLACEHOLDER FOR KEYWORDS
                        </div>
		            </div>
	            </div>
	            <div className="formSubmit">
	                <div>
			            <Controls.MButton onClick={submitForm} text="Submit" type="submit" />
			            <Controls.MButton color="secondary" onClick={resetForm} text="Reset"/>
		            </div>
	            </div>
            </div>
		</Form>
	)
}