import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function FormRating(props) {

	const { readOnly=null, readOnlyValue=null, ...other } = props

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

	const [hover, setHover] = useState(-1);

	return (
 	<Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <Rating
            name="hover-feedback"
            value={readOnly && readOnlyValue }
            {...(readOnly && {
                readOnly:true
            })}
            precision={0.5}
            onChange={(event, newValue) => {
// 				setValues();
				console.log("Hi :)")
			}}
			onChangeActive={(event, newHover) => {
				setHover(newHover);
			}}
//             emptyIcon={<StarIcon style={{ opacity: 0.55 }} />}
			sx={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}
            />
            {readOnlyValue !== null && (<Box sx={{ ml: 2 }}>{labels[readOnlyValue !== -1 && readOnlyValue]}</Box>)}
    </Box>
	)
}