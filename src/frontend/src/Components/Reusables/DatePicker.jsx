import React, { useState } from 'react';

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";

function FormDatePicker({ date, setDate }) {
	// for the date picker
// 	const [date, setDate] = useState(new Date());

	// will grab just the 'dateVisited' from the state object coming in
	const dateVisited = date.dateVisited;

	function onChange(dateToAssign) {
		setDate({
		...date,
		dateVisited: dateToAssign,
		})
	}

	return (
		<DayPickerInput onDayChange={onChange} />
	);
}

export default FormDatePicker