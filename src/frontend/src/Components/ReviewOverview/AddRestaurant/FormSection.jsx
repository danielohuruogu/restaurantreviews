import React, { useState, useEffect, useRef } from 'react';
import FreeSoloCreateOption from './AutocompleteTextField.jsx';

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import FormRating from './Rating.jsx';
import FormDatePicker from './DatePicker.jsx';
import TagInput from './TagsInput.jsx';

const FormSection = ({ addressInfo, handleClose, serverData }) => {


	/// **** INITIAL VALUES AND STATES
	const initialFValues = {
        id: 0,
        name:"",
        address:"",
// 		type_of_food:[],
// 		keywords: [],
		rating: 0,
        reviewTitle: "",
        reviewBody: "",
        // will assume the date was today
        dateVisited: new Date(),
    }

	const [ values, setValues ] = useState(initialFValues);

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

	const [ typeFoodTags, setTypeFoodTags ] = useState([]);

	const [ keywordTags, setKeywordTags ] = useState([]);

	const [ errors, setErrors ] = useState({});

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
			if (matchedValue.type_food) {
				setTypeFoodTags(matchedValue.type_food)
			}
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

	const handleInputChange = e => {
		const [ name, value ] = e.target;
		setValues({
			...values,
			[name]: value
		})
	}

	const submitForm = (e) => {
		e.preventDefault();
		if (validate()){
			console.log(values);
            resetForm();
        }

	};

	const resetForm = () => {

	};

	const validate = () => {
		let temp = {};
		temp.name = values.name ? "" : "Shop name required"
		temp.address = values.address ? "" : "Shop address required"
		temp.reviewTitle = values.reviewTitle ? "" : "Review title required"
		temp.reviewBody = values.reviewBody ? "" : "Review required"
		setErrors({
			...temp,
		});
	};

	return (
	<>
		<form onSubmit={submitForm}>
{/* 			<Grid container> */}
{/* 				<Grid item xs={6}> */}
			<label>Pick an existing restaurant or leave a review for a new one</label>
			<FreeSoloCreateOption
				selection={serverData}
				setMatchedValue={setMatchedValue}
				values={values}
				setValues={setValues}
			    />

			<TextField
				name="address"
				value={values.address}
				error
// 				ref={addressRef}
				label="Address"
				onChange={handleInputChange}
				/>

			<TextField
                name="title"
                value={values.reviewTitle}
                error
                label="Title"
                onChange={handleInputChange}
                />
			<FormRating />
            <FormDatePicker date={values} setDate={setValues}/>
            <TextareaAutosize
                name="body"
                value={values.reviewBody}
                error
                onChange={handleInputChange}
                aria-label="Section to leave a review"
                minRows={3}
                placeholder="What did you think?"
                />
            <Button type="submit">
                Submit
            </Button>
            <Button onClick={resetForm}>
                Reset
            </Button>
			<TagInput stateItems={typeFoodTags} setStateItems={setTypeFoodTags}/>
            <TagInput stateItems={keywordTags} setStateItems={setKeywordTags}/>
		</form>
</>
	)
}

export default FormSection;