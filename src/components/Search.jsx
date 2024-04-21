import Input from './Input';
import Button from './Button';

import { useState, useCallback, useRef } from 'react';

import searchlogo from '../assets/icons8-поиск-30.svg'
import '../styles/search.css';

let timeoutID = undefined

export default function Search({ onSearch }) {
    const [inputSearch, setInputSearch] = useState('');
    const inputSearchText = useRef(inputSearch)
    inputSearchText.current = inputSearch

    const handleInputChange = useCallback((e) => {
        setInputSearch(e.target.value)
        const searchString = inputSearchText.current.trim()
        if (searchString.length > 2) {
            clearTimeout(timeoutID)
            timeoutID = setTimeout(() => onSearch(searchString), 300)
        }
    }, []);

    const confirmSearch = useCallback(() => {
        const searchString = inputSearchText.current.trim()
        onSearch(searchString)
    }, [confirmSearch]);

    const handleKeyDown = useCallback((e) => {
        if (e.key == 'enter') {
            confirmSearch()
        }
    }, [confirmSearch])

    return (
        <div id='search'>
            <Input
                id='searchInput'
                placeholder='поиск'
                type='text'
                value={inputSearch}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} />
            <Button type='search' onClick={confirmSearch}>
                <img className='searchlogo' src={searchlogo} alt='searchlogo' width='20px' />
            </Button>
        </div>
    );
}