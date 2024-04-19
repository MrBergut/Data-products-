import Pagination from '@mui/material/Pagination';

import Search from '../components/Search';
import Card from '../components/Card';
import BasicSelect from '../components/BasicSelect';

import React, { useCallback, useEffect, useRef, useState } from 'react';

export default function Catalog(props) {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(12)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const isInitialMount = useRef(true)


    const getProductsByQuery = useCallback(async () => {
        if (query.trim() === '') {
            console.log('произошёл setLimit(12)')
            // setLimit(12);
        } else {
            const url = new URL('https://dummyjson.com/products/search')
            url.searchParams.set('q', query)
            const productsData = await fetch(url).then(res => res.json())
            setProducts(productsData.products)
        }
    }, [query])

    const getProductsList = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products')
        url.searchParams.set('limit', limit)
        url.searchParams.set('skip', (page - 1) * limit)
        const productsData = await fetch(url).then(res => res.json())
        console.log('productsData', productsData)
        setProducts(productsData.products)
        setTotalPages(Math.ceil(productsData.total / (limit)))
    }, [limit, page])

    useEffect(() => {
        getProductsList()
    }, [limit, page])

    useEffect(() => {
        if (!isInitialMount.current) {
            getProductsByQuery()
        }
    }, [query])

    const setLimitHandler = (newLimit) => {
        setLimit(newLimit)
        setPage(1)
    }

    const setPageHandler = (event, value) => {
        setPage(value)
    }

    const searchHandler = useCallback((searchQuery) => {
        setQuery(searchQuery)
    }, [])

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false
        }
    }, [])

    return (
        <>
            <div className='searchandsortingandlimit'>
                <div className='buttongroups'>
                    <p>Показать:</p>
                    <BasicSelect onChange={setLimitHandler} />
                </div>
                <div className='search'>
                    <Search onSearch={searchHandler} />
                </div>
            </div>
            <div className='catalog'>
                {products.map(item => <Card key={item.id} {...item} />)}
            </div>
            <div className='paginator'>
                <Pagination count={totalPages} page={page} onChange={setPageHandler} variant="outlined" shape="rounded" />
            </div>
        </>

    )
}