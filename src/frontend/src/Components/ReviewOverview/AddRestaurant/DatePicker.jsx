import React, { useState } from 'react';

import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";


function FormDatePicker() {
	// for the date picker
	const [date, setDate] = useState(new Date());

	function onChange(date) {
		setDate(date)
	}

	return (
		<DayPickerInput onDayChange={onChange} />
	);
}

export default FormDatePicker