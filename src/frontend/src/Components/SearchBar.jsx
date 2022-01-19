import React from "react";
import "./SearchBar.css";
import { useNavigate } from 'react-router-dom'
import { BsSearch } from "react-icons/bs"

const SearchBar = ({ searchQuery, setSearchQuery }) => {

    const navigate = useNavigate();
    const onSubmit = e => {
        if (searchQuery) {
            navigate(`?search=${searchQuery}`)
        }
        e.preventDefault()
    }

    return (
        <div className="searchBarContainer">
            <form onSubmit={onSubmit} className="searchForm">
                <input
                    value={searchQuery}
                    onInput={e => setSearchQuery(e.target.value)}
                    placeholder="Search for a restaurant"
                    type="search"
                    name="search"
                    className="searchBox"
                    autoComplete="off"
                />
                <button type="submit" aria-label="search" className="btn">
                    <BsSearch />
                </button>
            </form>
        </div>
    );
};

export default SearchBar;