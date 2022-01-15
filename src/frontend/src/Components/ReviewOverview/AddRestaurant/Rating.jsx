import React, { useState } from 'react'
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const FormRating = () => {

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
 	<Box sx={{display: 'flex', alignItems: 'center', width: 200}}>
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
            />
            {value !== null && (<Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>)}
    </Box>
	)
}

export default FormRating;