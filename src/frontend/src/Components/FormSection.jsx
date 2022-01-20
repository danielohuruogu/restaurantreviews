import React, { useState, useEffect } from 'react';

import { useForm, Form } from './useForm.jsx';

import Controls from './Reusables/Controls.jsx';

export default function FormSection(props) {

	const { addressInfo, data } = props
	/// **** INITIAL VALUES AND STATES
	const initialFValues = {
        id: 0,
        name:"",
        address:"",
		type_of_food:[],
		keywords: [],
		rating: 0,
        reviewTitle: "",
        reviewBody: "",
        dateVisited: new Date(),
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

// 	const [ typeFoodTags, setTypeFoodTags ] = useState([]);

// 	const [ keywordTags, setKeywordTags ] = useState([]);

	/// ****  BELOW IS CODE TO HELP THE USER EXPERIENCE WITH THE FORM

	// TO GRAB A VALUE FROM THE AUTOCOMPLETE AND FILL IN THE REST OF THE FORM, TO
	// PREVENT DUPLICATES IN THE DATABASE
	useEffect(() => {
		if (matchedValue) {
			if (matchedValue.address) {
				console.log(matchedValue)
				setValues({
					...values,
					address: matchedValue.address
				})
			}
// 			if (matchedValue.type_food) {
// 				setTypeFoodTags(matchedValue.type_food)
// 			}
		}
	}, [matchedValue]);

	 // TO GRAB THE FORMATTED ADDRESS FROM GOOGLE MAPS AND PUT IT IN THE FORM,
	 // TO MAKE SURE ACCURATE ADDRESSES ARE SAVED TO THE DATABASE
	useEffect(() => {
		if (addressInfo) {
  			console.log(addressInfo)
			setValues({
				...values,
				address: addressInfo.formatted_address,
			})
		}
	}, [addressInfo]);

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
		<Form onSubmit={submitForm}>
{/* 			<Grid container> */}
{/* 				<Grid item xs={6}> */}
			<label>Pick an existing restaurant or leave a review for a new one</label>
			<Controls.AutoCompleteInput
				options={data}
				setMatchedValue={setMatchedValue}
				values={values}
				setValues={setValues}
			    />
			<Controls.Input
				name="address"
				value={values.address}
				label="Shop Address"
				onChange={handleInputChange}
				error={errors.name}
				/>
			<Controls.TagsInput name="type_of_food" stateItems={values} setStateItems={setValues}/>
            <Controls.TagsInput name="keywords" stateItems={values} setStateItems={setValues}/>
            <Controls.Input
                name="reviewTitle"
                value={values.reviewTitle}
                label="Title"
                onChange={handleInputChange}
                error={errors.reviewTitle}
                />
			<Controls.Rating />
            <Controls.DatePicker date={values} setDate={setValues}/>
            <Controls.TextArea
                name="reviewBody"
                value={values.reviewBody}
                aria-label="Section to leave a review"
                onChange={handleInputChange}
                minRows={3}
                placeholder="What did you think?"
                />
            <Controls.MButton onClick={submitForm} text="Submit" type="submit" />
            <Controls.MButton color="default" onClick={resetForm} text="Reset"/>
		</Form>
	)
}