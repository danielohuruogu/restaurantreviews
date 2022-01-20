import React from 'react';
import Button from '@mui/material/Button';

export default function MButton(props) {
// 			{/* color={color || "primary"} */}

	const { text, size, color, variant, onClick, ...other } = props
	return (
		<Button
			variant={variant || "contained"}
			size={size || "large"}
			onClick={onClick}
			{...other}
			>
			{text}
		</Button>
	)
}