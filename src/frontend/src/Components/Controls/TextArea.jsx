import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';


export function TextArea(props) {

	const { name, value, aria-label, onChange, minRows, placeholder } = props

	return (
		<TextareaAutosize
            name={name}
            value={value}
            aria-label={aria-label}
            onChange={onChange}
            minRows={minRows}
            placeholder={placeholder}
            />
	)
}