import React, { useState } from 'react'

export function useForm(initialFValues) {

	const [values, setValues] = useState(initialFValues)
	const [errors, setErrors] = useState({})

	const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    }

    const resetForm = () => {
        console.log("reset form happens here")
        setValues(initialFValues);
        setErrors({});
    };

	return {
		values,
		setValues,
		errors,
		setErrors,
		resetForm,
		handleInputChange,
	}
}

export function Form(props) {

	const {children, ...other} = props;

	return (
		<form autocomplete="off" {...other}>
			{props.children}
		</form>
	)
}