import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';

import Search from '../components/Search';
import Card from '../components/Card';
import BasicSelect from '../components/BasicSelect';

import { useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import '../styles/catalog.css'

export default function Catalog(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 12)
    const [query, setQuery] = useState(searchParams.get('q') ?? '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const isInitialMount = useRef(true)

    const spinner = isLoading ? <CircularProgress /> : null

    const getProductsByQuery = useCallback(async () => {
        if (query.trim() === '') {
            setLimit(12);
        } else {
            const url = new URL('https://dummyjson.com/products/search')
            url.searchParams.set('q', query)
            setSearchParams({ q: query })
            setIsLoading(true)
            const productsData = await fetch(url).then(res => res.json())
            setProducts(productsData.products)
            setIsLoading(false)
        }
    }, [query])

    const getProductsList = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products')
        url.searchParams.set('limit', limit)
        url.searchParams.set('skip', (page - 1) * limit)
        setSearchParams({ limit, page })
        setIsLoading(true)
        const productsData = await fetch(url).then(res => res.json())
        console.log('productsData', productsData)
        setProducts(productsData.products)
        setTotalPages(Math.ceil(productsData.total / (limit)))
        setIsLoading(false)
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
        <div className='catalog'>
            <div className='searchandsortingandlimit'>
                <div className='buttongroups'>
                    <p>Показать:</p>
                    <BasicSelect value={limit} onChange={setLimitHandler} />
                </div>
                <div className='search'>
                    <Search onSearch={searchHandler} />
                </div>
            </div>
            {spinner || (<>
                <div className='catalog'>
                    {products.map(item => <Card key={item.id} {...item} />)}
                </div>
                <div className='paginator'>
                    <Pagination count={totalPages} page={page} onChange={setPageHandler} variant="outlined" shape="rounded" />
                </div>
            </>)}
        </div>

    )
}