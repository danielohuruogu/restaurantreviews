import React, { useState } from 'react';

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

export default function FormDatePicker(props) {

	const { name, values, setValues } = props;
	// for the date picker
// 	const [date, setDate] = useState(new Date());

	// will grab just the 'dateVisited' from the state object coming in
	const dateVisited = values.dateVisited;

	function onChange(dateToAssign) {
		setValues({
		...values,
		[name]: dateToAssign,
		})
	}

	return (
		<DayPickerInput onDayChange={onChange} />
	);
}