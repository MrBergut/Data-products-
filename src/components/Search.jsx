import Input from './Input';
import Button from './Button';

import { useState, useCallback } from 'react';

import searchlogo from '../assets/icons8-поиск-30.svg'
import '../styles/search.css';

export default function Search({ onSearch }) {
    const [inputSearch, setInputSearch] = useState('');

    const handleInputChange = (e) => {
        setInputSearch(e.target.value)
    };

    const confirmSearch = () => {
        if (inputSearch.trim() === '') {
            onSearch('')
        } else {
            onSearch(inputSearch)
        }

    };

    return (
        <div id='search'>
            <Input
                id='searchInput'
                placeholder='поиск'
                type='text'
                value={inputSearch}
                onChange={handleInputChange} />
            <Button type='search' onClick={confirmSearch}>
                <img className='searchlogo' src={searchlogo} alt='searchlogo' width='20px' />
            </Button>
        </div>
    );
}