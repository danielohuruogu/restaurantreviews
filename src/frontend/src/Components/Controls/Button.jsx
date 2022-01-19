import React from 'react'
import Button as MUIButton from '@mui/material/Button';

export function Button(props) {

	const { text, size, color, variant, onClick, ...other } = props
	return (
		<MUIButton
			variant={variant || "contained"}
			size={size || "large"}
			color={color || "primary"}
			onClick={onClick}
			{...other}
			>
			{text}
		</MUIButton>
	)
}