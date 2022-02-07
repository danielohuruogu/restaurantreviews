import React, { useState, useEffect } from 'react';

import MButton from './Button.jsx';

import '../../Styles/TagsInput.css';

//https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
export default function TagsInput(props) {

	const { stateItems, setStateItems, name } = props
	const [input, setInput] = useState('');
	const [isKeyReleased, setIsKeyReleased] = useState(false);

// 	console.log(stateItems)
	var fieldInObjectToUpdate = Object.entries(stateItems).filter(field => field[0] == name)
// 	console.log(fieldInObjectToUpdate)
	var fieldToCheck = fieldInObjectToUpdate[0];
// 	console.log(fieldToCheck);
	var stateItemsArray = fieldToCheck[1];
// 	console.log(stateItemsArray)

	const onChange = (e) => {
		const { value } = e.target;
		setInput(value);
	}

	const onKeyDown = (e) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if ((key === ',' || key === 'Enter' || key === ' ') && trimmedInput.length && !stateItemsArray.includes(trimmedInput)) {
			e.preventDefault();
			setStateItems({
				...stateItems,
				[name]: [...stateItemsArray, trimmedInput]
				});
			setInput('');
		}

		if (key === 'Backspace' && !input.length && stateItemsArray.length && isKeyReleased) {
			e.preventDefault();
			const stateItemsCopy = stateItemsArray;
			const poppedTag = stateItemsCopy.pop();
			setStateItems({
				...stateItems,
				[name]: stateItemsCopy
			});
			setInput(poppedTag);
		}
		setIsKeyReleased(false);
	}

	const onKeyUp = () => {
		setIsKeyReleased(true);
	}

	const deleteTag = (index) => {
		const poppedItemsArray = stateItemsArray.filter((tag, i) => i !== index);
		setStateItems({
			...stateItems,
			[name]: poppedItemsArray
		});
	}

	return (
	<div className="inputContainer">
	{stateItemsArray.map((tag, index) =>
		<div className="tag" key={index}>
			{tag}
			<MButton onClick={()=> deleteTag(index)} text="x"/>
		</div>)}
		<input
			value={input}
			placeholder="Enter a tag"
			onKeyDown={onKeyDown}
			onKeyUp={onKeyUp}
			onChange={onChange}
			/>
	</div>
	);
}