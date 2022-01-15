import React, { useState } from 'react';
import FreeSoloCreateOption from './AutocompleteTextField.jsx';

import TextField from "@mui/material/TextField";
import TextareaAutosize from '@mui/material/TextareaAutosize';
// import RaisedButton from "@mui/material/RaisedButton";
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';


function ReviewForm() {

	const initialFValues = {
		id: 0,
		name:"",
		address:"",
		type_of_food:[""],
		keywords: [""],
		reviewTitle: "",
		rating: 0,
		reviewBody: "",
		dateVisited: new Date(),
	}

	const [ values, setValues ] = useState();

	const handleInputChange = e => {
		const [ name, value ] = e.target;
		setValues({
			...values,
			[name]: value
		})
	}

	const convertToDefEventPara = (name, value) => ({
        target: {
            name, value
        }
    })

	// for the rating
	const labels = {
      0.5: 'Useless',
      1: 'Useless+',
      1.5: 'Poor',
      2: 'Poor+',
      2.5: 'Ok',
      3: 'Ok+',
      3.5: 'Good',
      4: 'Good+',
      4.5: 'Excellent',
      5: 'Excellent+',
    };

	const [value, setValue] = useState(2);
	const [hover, setHover] = useState(-1);

	return (
	<>
		<form>
{/* 			<Grid container> */}
{/* 				<Grid item xs={6}> */}
{/* 			<FreeSoloCreateOption */}
{/* 			    /> */}
{/* 			<TextField */}
{/* 				name="address" */}
{/* 				value={values.address} */}
{/* 				floatingLabelText="Address" */}
{/* 				onChange={handleInputChange} */}
{/* 				/> */}
{/* 			<TextField */}
{/* 				name="type of food" */}
{/* 				value={values.type_of_food} */}
{/* 				floatingLabelText="Type of food" */}
{/* 				onChange={handleInputChange} */}
{/* 				/> */}
{/* 			<TextField */}
{/* 				name="keywords" */}
{/* 				value={values.keywords} */}
{/* 				floatingLabelText="keywords" */}
{/* 				onChange={handleInputChange} */}
{/* 				/> */}
{/* 			<TextField */}
{/*                 name="title" */}
{/*                 value={values.reviewTitle} */}
{/*                 floatingLabelText="Title" */}
{/*                 onChange={handleInputChange} */}
{/*                 /> */}
{/*             {/*insert one for rating*/} */}
{/*             <Box sx={{display: 'flex', alignItems: 'flex-start', width: 200}}> */}
{/* 	            <Rating */}
{/* 	                name="hover-feedback" */}
{/* 	                value={value} */}
{/* 	                precision={0.5} */}
{/* 	                onChange={(event, newValue) => { */}
{/* 	                  setValue(newValue); */}
{/* 	                }} */}
{/* 	                onChangeActive={(event, newHover) => { */}
{/* 	                  setHover(newHover); */}
{/* 	                }} */}
{/* 	                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />} */}
{/* 	                /> */}
{/* 	            {value !== null && (<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]} */}
{/* 	        </Box> */}

{/* //             <MuiPickersUtilsProvider utils={DateFnsUtils}> */}
{/* // 	            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined" */}
{/* // 	                label={label} */}
{/* // 	                format={dateFormat || "dd/MM/yyyy"} */}
{/* // 	                name={name} */}
{/* // 	                value={value} */}
{/* // 	                onChange={date => onChange(convertToDefEventPara(name, date))} */}
{/* // 	                {...other} */}
{/* // 	                /> */}
{/* //             </MuiPickersUtilsProvider> */}
{/*             <TextareaAutosize */}
{/*                 name="body" */}
{/*                 value={values.reviewBody} */}
{/*                 onChange={handleInputChange} */}
{/*                 aria-label="Section to leave a review" */}
{/*                 minRows={3} */}
{/*                 placeholder="What did you think?" */}
{/*                 /> */}
{/* 				</Grid> */}
{/* 			</Grid> */}
{/* 			<RaisedButton */}
{/* 				className="submit" */}
{/* 				primary={true} */}
{/* 				type="submit" */}
{/* 				label="submit" */}
{/* 				text="Submit" */}
{/* 				/> */}
{/* 			<RaisedButton */}
{/*                 className="submit" */}
{/*                 primary={false} */}
{/*                 type="submit" */}
{/*                 label="submit" */}
{/*                 text="Reset" */}
{/*                 /> */}
            <button>
                TEST
                </button>
		</form>
		</>
	)
};

export default ReviewForm;