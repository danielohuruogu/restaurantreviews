import React, { useState, useEffect } from 'react';

import MButton from './Button.jsx';

import '../../Styles/TagsInput.css';

//https://blog.logrocket.com/building-a-tag-input-field-component-for-react/
export default function TagsInput(props) {

	const { stateItems, setStateItems, name } = props
	const [input, setInput] = useState('');
	const [isKeyReleased, setIsKeyReleased] = useState(false);

// 	console.log(stateItems)
// 	const nameString = name;
//
// 	console.log(nameString)
// 	console.log(typeof nameString);
//
// 	console.log(typeof name);
//
// 	console.log(typeof stateItems);

	const stateItemsArray = [...stateItems.name];

	var stateItemsTwo = Object.entries(stateItems).filter(field => field == name )

// 	console.log(stateItemsTwo);
//
// 	console.log("stateItems.name is a " + typeof(stateItems.name))
// 	console.log("stateItems.nameString is a " + typeof(stateItems.nameString))

// 	useEffect(()=> {
// 		stateItemsTwo = Object.entries(stateItems).filter(field => field == name )
// 	}, [stateItems])
//

	const onChange = (e) => {
		const { value } = e.target;
		setInput(value);
	}

	const onKeyDown = (e) => {
		const { key } = e;
		const trimmedInput = input.trim();

		if ((key === ',' || key === 'Enter' || key === ' ') && trimmedInput.length && !stateItemsArray.includes(trimmedInput)) {
			e.preventDefault();
			// add the trimmed input to the array above
// 			stateItemsTwo.push(trimmedInput)
			// and set the object state's array
			setStateItems({
				...stateItems,
				[name]: [...stateItemsTwo, trimmedInput]
				});
			console.log(trimmedInput);
			console.log(stateItemsTwo)
			console.log(stateItems)
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