import React, { useState, useEffect, useRef } from 'react';
import FreeSoloCreateOption from './AutocompleteTextField.jsx';

import TextField from '@mui/material/TextField';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Button from '@mui/material/Button';

import FormRating from './Rating.jsx';
import FormDatePicker from './DatePicker.jsx';
import TagInput from './TagsInput.jsx';

const FormSection = ({ addressInfo, handleClose, serverData }) => {

	const KeyCodes = {
		comma: 188,
		enter: [10, 13],
	};

	const delimiters = [...KeyCodes.enter, KeyCodes.comma];

	const initialFValues = {
        id: 0,
        name:"",
        address:"",
// 		type_of_food:[],
// 		keywords: [],
        reviewTitle: "",
        reviewBody: "",
        dateVisited: new Date(),
    }

	const [ values, setValues ] = useState(initialFValues);

	// to programmatically change address to Google Search answer
	// 	const addressRef = useRef();

	// to programmatically change form values if there's a match in Autocomplete
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

	// on a matched value being selected, the text fields in the form need to be changed
	// to reflect what's already in the database - no need for duplicates

	const [ typeFoodTags, setTypeFoodTags ] = useState([]);

	const [ keywordTags, setKeywordTags ] = useState([]);

	useEffect(() => {
		if (matchedValue) {
			if (matchedValue.address){
				console.log(matchedValue)
				setValues({
					...values,
					address: matchedValue.address
				})
				setTypeFoodTags(matchedValue.type_food)
			}
		}
	}, [matchedValue]);
//

// THIS CODE BELOW WORKS - DO NOT DELETE
	useEffect(() => {
		if (addressInfo) {
  			console.log(addressInfo)
			setValues({
				...values,
				address: addressInfo.formatted_address,
			})
		}
	}, [addressInfo]);

	const handleInputChange = e => {
		const [ name, value ] = e.target;
		setValues({
			...values,
			[name]: value
		})
	}

	const submitForm = (restaurantReview) => {
		console.log(restaurantReview)
	};

	return (
	<>
		<form action="">
{/* 			<Grid container> */}
{/* 				<Grid item xs={6}> */}
			<FreeSoloCreateOption selection={serverData} setMatchedValue={setMatchedValue}
			    />

			<TextField
				name="address"
				value={values.address}
// 				ref={addressRef}
				label="Address"
				onChange={handleInputChange}
				/>


			<TextField
                name="title"
                value={values.reviewTitle}
                label="Title"
                onChange={handleInputChange}
                />
			<FormRating />
            <FormDatePicker />
            <TextareaAutosize
                name="body"
                value={values.reviewBody}
                onChange={handleInputChange}
                aria-label="Section to leave a review"
                minRows={3}
                placeholder="What did you think?"
                />
            <Button onClick={submitForm}>
                Submit
            </Button>
            <Button>
                Reset
            </Button>
			<TagInput stateItems={typeFoodTags} setStateItems={setTypeFoodTags}/>
            <TagInput stateItems={keywordTags} setStateItems={setKeywordTags}/>
		</form>
</>
	)
}

export default FormSection;