import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

export default function DynRating(props) {

	const { values, setValues, name, readOnly=null, readOnlyValue=null, ...other } = props

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

	var fieldInObjectToUpdate = Object.entries(values).filter(field => field[0] == name)
//  console.log(fieldInObjectToUpdate)
    var fieldToCheck = fieldInObjectToUpdate[0];
// 	console.log(fieldToCheck);
    var fieldValue = fieldToCheck[1];
// 	console.log(stateItemsArray)

	const [hover, setHover] = useState(-1);

	return (
 	<Box sx={{display: 'flex', alignItems: 'center'}}>
        <Rating
            name="hover-feedback"
            value={ readOnly ? readOnlyValue : fieldValue }
            {...(readOnly && {
                readOnly:true
            })}
            precision={0.5}
            onChange={(event, newValue) => {
				setValues({
					...values,
					[name]: newValue
				});
			}}
			onChangeActive={(event, newHover) => {
				setHover(newHover);
			}}
            />
            {( fieldValue !== null && !readOnly ) && (<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : fieldValue ]}</Box>)}
    </Box>
	)
}