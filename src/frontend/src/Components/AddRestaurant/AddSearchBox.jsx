
/*

1/1/22 edit:
tried this, didn't work. don't bother


*/

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { useState, useEffect, useRef, useCallback } from 'react';
//
//
// const SearchBox = ({ maps,placeholder, onPlacesChanged }) => {
//
// 	const input = useRef(null);
// 	const searchBox = useRef(null);
//
// 	const handleOnPlacesChanged = useCallback(() => {
// 		if (onPlacesChanged) {
// 			onPlacesChanged(searchBox.current.getPlaces());
// 		}
// 	}, [onPlacesChanged, searchBox]);
//
// 	useEffect( () => {
// 		if (!searchBox.current && maps) {
// 			searchBox.current = new window.google.maps.places.SearchBox(input.current);
// 			searchBox.current.addListener('places_changed', handleOnPlacesChanged);
// 		}
//
// 		return () => {
// 			if(maps) {
// 				searchBox.current = null;
// 				window.google.maps.event.clearInstanceListeners(searchBox)
// 			}
// 		}
// 	}, [maps, handleOnPlacesChanged]);
//
// 	return <input ref="input" placeholder={placeholder} type="text"/>;
// }
//
// export default SearchBox;