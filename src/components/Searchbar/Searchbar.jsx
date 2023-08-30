import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {Header, SearchForm, SearchFormBtn, SearchInput} from './Searchbar.styled'
import { FaSearch } from "react-icons/fa";

export const Searchbar =({getSearchQuery})=>  {

    const [searchItem, setSearchItem] = useState('')
    
    const onInputChange = e => {
        setSearchItem(e.currentTarget.value.toLowerCase())
    }

    const onFormSubmit = e => {
        e.preventDefault();

        if (searchItem.trim() === '') {
            return toast.error('enter a search term');
        }
        getSearchQuery(searchItem);
        setSearchItem('')
    }


    return (
        <Header>
            <SearchForm
                onSubmit={onFormSubmit}
            >
                <SearchFormBtn>
                    <FaSearch/>
                </SearchFormBtn>
                <SearchInput
                    type='text' 
                    name="searchItem"
                    value={searchItem}
                    onChange={onInputChange}
                />
            </SearchForm>
        </Header>
    )
}

Searchbar.propTypes = {
    getSearchQuery: PropTypes.func.isRequired,
}

export default Searchbar