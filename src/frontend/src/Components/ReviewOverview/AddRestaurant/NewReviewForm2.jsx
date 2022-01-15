import React, { useState } from "react";
import FlatButton from "material-ui/FlatButton";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
// import PasswordStr from "./PasswordStr";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';
import "./NewReviewForm.css";

const ReviewForm = ({
	history,
	onSubmit,
	onChange,
	errors,
	user,
	score,
	btnTxt,
	type,
	pwMask,
	onPwChange
	}) => {

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
		<div className="loginBox">
		  {errors.message && <p style={{ color: "red" }}>{errors.message}</p>}
			<form onSubmit={onSubmit}>
				<TextField
				  name="Name"
				  floatingLabelText="Restaurant name"
				  value={restaurant.name}
				  onChange={onChange}
				  errorText={errors.name}
				/>
				<TextField
				  name="Address"
				  floatingLabelText="Address"
				  value={restaurant.address}
				  onChange={onChange}
				  errorText={errors.address}
				/>
				<Box sx={{display: 'flex', alignItems: 'flex-start', width: 200}}>
					<Rating
					    name="hover-feedback"
					    value={value}
					    precision={0.5}
					    onChange={(event, newValue) => {
					      setValue(newValue);
					    }}
					    onChangeActive={(event, newHover) => {
					      setHover(newHover);
					    }}
					    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
					/>
					{value !== null && (<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}
				</Box>
			    <TextareaAutosize
					aria-label="Section to leave a review"
					minRows={3}
					placeholder="What did you think?"
					style={{ width: 400 }}
                />
				<br />
				<RaisedButton
					className="signUpSubmit"
					primary={true}
					type="submit"
					label="submit"
					/>
			</form>
		</div>
	);
};

export default ReviewForm;