import React from 'react';
import TextField from '@mui/material/TextField';

export function Input(props) {

	const { name, value, label, onChange, error=null, ...other } = props

	return (
		<TextField
	        name={name}
	        value={value}
	        label={label}
	        onChange={onChange}
	        // check rest. If error is not null, set the error prop to true and
	        // the helper text will be error's value
	        {...(error && {error:true, helperText:error})}
	        {...other}
	        />
	)
}