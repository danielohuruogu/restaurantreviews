import React, { useState } from 'react';

// import Button from '@mui/material/Button';
import { Button } from 'antd';

//https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
const TagInput = ({ stateItems, setStateItems }) => {
	const [input, setInput] = useState('');
	const [isKeyReleased, setIsKeyReleased] = useState(false);

	const onChange = (e) => {
		const { value } = e.target;
		setInput(value);
	}

	const onKeyDown = (e) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if ((key === ',' || key === 'Enter' || key === ' ') && trimmedInput.length && !stateItems.includes(trimmedInput)) {
			e.preventDefault();
			setStateItems(prevState => [...prevState, trimmedInput]);
			setInput('');
		}

		if (key === 'Backspace' && !input.length && stateItems.length && isKeyReleased) {
			e.preventDefault();
			const stateItemsCopy = [...stateItems];
			const poppedTag = stateItemsCopy.pop();
			console.log(poppedTag);
			setStateItems(stateItemsCopy);
			setInput(poppedTag);
		}
		setIsKeyReleased(false);
	}

	const onKeyUp = () => {
		setIsKeyReleased(true);
	}

	const deleteTag = (index) => {
		console.log("tried to delete");
		setStateItems(prevState => prevState.filter((tag, i) => i !== index));
		console.log(stateItems);
	}

	return (
	<div className="container">
	{stateItems.map((tag, index) =>
		<div className="tag">
			{tag}
			<Button onClick={()=> deleteTag(index)}>
				x</Button>
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

export default TagInput