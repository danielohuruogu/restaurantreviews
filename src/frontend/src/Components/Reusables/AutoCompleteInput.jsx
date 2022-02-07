import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutoCompleteInput(props) {

	const { name, options, setMatchedValue, values, setValues, style=null } = props

// 	 onClick={()=> setMatchedValue(option)}

	return (
		<Autocomplete
			value={values.name}
			sx={{style}}
			onChange={(event, newValue) => {
				if (typeof newValue === 'string') {
					setValues({
						...values,
						name: newValue,
					});
				} else if (newValue && newValue.inputValue) {
				  // Create a new value from the user input
					setValues({
						...values,
						name: newValue.inputValue,
					});
				} else {
				  setValues(newValue);
				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue === option.name);
				// if the inputValue has something and doesn't match any currently existing option
				if (inputValue !== '' && !isExisting) {
					filtered.push({
						inputValue,
						name: `Add "${inputValue}"`,
					});
				}
				return filtered;
			}}
			selectOnFocus={true}
// 			clearOnBlur={true}
			handleHomeEndKeys={true}
			id="free-solo-with-text-demo"
			options={options}
			getOptionLabel={(option) => {
				if (option.inputValue !== ''){
			        // Value selected with enter, right from the input
					if (typeof option === 'string') {
						return option;
					}
			        // Add "xxx" option created dynamically
			        if (option.inputValue) {
			          return option.inputValue;
			        }
			        // Regular option
			        return option.name;
		        }
			}}
			renderOption={(props, option) =>
				<ul {...props} style={{ listStyleType: "none", display: "flex", textAlign: "left"}}>
				    <li><strong>{option.name}</strong></li>
				    <li style={{ paddingLeft: "5px" }}>{option.postcode}</li>
				</ul>
			}
			sx={{ width: 300 }}
			freeSolo
			renderInput={(params) => (
			<TextField {...params} label="Where did you visit?" />
			)}
		/>
	);
}