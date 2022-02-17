import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function AutoCompleteInput(props) {

	const { name, shopOptions, setMatchedValue,
	values, setValues,
	 onChange, style=null } = props

// 	 onClick={()=> setMatchedValue(option)}
// 	const [value, setValue] = useState();
// 	console.log(values);
// 	console.log(shopOptions);

	return (
		<Autocomplete
			value={values.shopName}
			sx={{style}}
			onChange=
// 			{onChange}
			{(event, newValue) => {
				console.log(newValue);
				if (typeof newValue === 'string') {
					setValues({
						...values,
						[name]: newValue,
					});
// 					console.log(values.shopName)
				} else if (newValue && newValue.inputValue) {
				  // Create a new value from the user input
					setValues({
						...values,
						[name]: newValue.inputValue,
					});
// 					console.log(values.shopName)
				}
// 				else {
// 				  setValues(newValue);
// 				  console.log(values)
// 				}
			}}
			filterOptions={(options, params) => {
				const filtered = filter(options, params);

				const { inputValue } = params;
				// Suggest the creation of a new value
				const isExisting = options.some((option) => inputValue === option.shopName);
				// if the inputValue has something and doesn't match any currently existing option
// 				console.log(isExisting);
				if (inputValue !== '' && !isExisting) {
					filtered.push({
						inputValue,
						shopName: `Add "${inputValue}"`,
					});
				}
				return filtered;
			}}
			selectOnFocus
			handleHomeEndKeys
			id="free-solo-with-text-demo"
			options={shopOptions}
// 			noOptionsText={(<p>no options</p>)}
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
			        return option.shopName;
		        }
			}}
			renderOption={(props, option) =>
				<ul {...props} style={{ listStyleType: "none", display: "flex", textAlign: "left"}}>
				    <li><strong>{option.shopName}</strong></li>
				    {option.address &&(
						<li style={{ paddingLeft: "5px" }}>{option.address.postCode}</li>
				    )}
				</ul>
			}
			sx={{ width: 300 }}
			freeSolo
			renderInput={(params) => (
			<TextField {...params} name={name} label="Where did you visit?" />
			)}
		/>
	);
}