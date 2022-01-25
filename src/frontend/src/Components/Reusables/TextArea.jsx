import React from 'react';
import TextareaAutosize from '@mui/material/TextareaAutosize';

export default function TextArea(props) {

	const { name, value, ariaLabel, onChange, minRows, placeholder, style=null } = props

	return (
		<TextareaAutosize
            name={name}
            value={value}
            aria-label={ariaLabel}
            onChange={onChange}
            minRows={minRows}
            placeholder={placeholder}
            style={style}
            />
	)
}