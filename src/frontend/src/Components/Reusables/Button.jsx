import React from 'react';
import Button from '@mui/material/Button';

export default function MButton(props) {
// 			{/* color={color || "primary"} */}

	const { text, size, color, variant, onClick, ...other } = props
	return (
		<Button
			variant={variant || "contained"}
			color={color || "primary"}
			size={size || "medium"}
			onClick={onClick}
			{...other}
			>
			{text}
		</Button>
	)
}