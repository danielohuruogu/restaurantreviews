import React from "react";

import { useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"

import "../Styles/SearchBar.css";


export default function SearchBar(props) {

	const { searchQuery, setSearchQuery } = props

    const navigate = useNavigate();
//     const onSubmit = e => {
//         e.preventDefault()
//         if (searchQuery) {
//             navigate(`?search=${searchQuery}`)
//         }
//     }
// onSubmit={onSubmit}

    return (
        <div className="searchBarContainer">
            <form className="searchForm">
                <input
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    placeholder="Search by name or address"
                    type="search"
                    name="search"
                    className="searchBox"
                    autoComplete="off"
                    />
            </form>
        </div>
    );
};

{/*                 <button type="submit" aria-label="search" className="btn"> */}
{/*                     <BsSearch /> */}
{/*                 </button> */}