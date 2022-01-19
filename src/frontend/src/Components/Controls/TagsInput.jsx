import React, { useState } from 'react';

import Button from './Button.jsx';

//https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
const TagsInput = (props) => {

	const { stateItems, setStateItems, name } = props
	const [input, setInput] = useState('');
	const [isKeyReleased, setIsKeyReleased] = useState(false);

	const stateItemsArray = [...stateItems.name];

	const onChange = (e) => {
		const { value } = e.target;
		setInput(value);
	}

	const onKeyDown = (e) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if ((key === ',' || key === 'Enter' || key === ' ') && trimmedInput.length && !stateItems.includes(trimmedInput)) {
			e.preventDefault();
			setStateItems({
				...stateItems,
				[name]: [...stateItemsArray, trimmedInput]
				});
			setInput('');
		}

		if (key === 'Backspace' && !input.length && stateItems.length && isKeyReleased) {
			e.preventDefault();
			const stateItemsCopy = stateItemsArray;
			const poppedTag = stateItemsCopy.pop();
			console.log(poppedTag);
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
		console.log("tried to delete");
		const poppedItemsArray = stateItemsArray.filter((tag, i) => i !== index);
		setStateItems({
			...stateItems,
			[name]: poppedItemsArray
		});
// 		prevState => prevState.filter((tag, i) => i !== index)
		console.log(stateItems);
	}

	return (
	<div className="container">
	{stateItemsArray.map((tag, index) =>
		<div className="tag" key={index}>
			{tag}
			<Button onClick={()=> deleteTag(index)} text="x"/>
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

export default TagsInput