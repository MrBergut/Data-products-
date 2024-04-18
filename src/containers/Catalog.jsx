import Pagination from '@mui/material/Pagination';

import Search from '../components/Search';
import Card from '../components/Card';
import BasicSelect from '../components/BasicSelect';
import data from './ololo';

import React, { useCallback, useEffect, useState } from 'react';

export default function Catalog(props) {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(12)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    const getProductsByQuery = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products/search')
        url.searchParams.set('q', query)
        const productsData = await fetch(url).then(res => res.json())
        setProducts(productsData.products)
    }, [query])

    const getProductsList = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products')
        url.searchParams.set('limit', limit)
        url.searchParams.set('skip', (page - 1) * limit)
        const productsData = await fetch(url).then(res => res.json())
        console.log('===ASDE===', productsData)
        setProducts(productsData.products)
        setTotalPages(Math.ceil(productsData.total / (limit)))
    }, [limit, page])

    useEffect(() => {
        getProductsList()
    }, [])

    useEffect(() => {
        getProductsList()
    }, [limit, page])

    useEffect(() => {
        getProductsByQuery()
    }, [query])

    const setLimitHandler = (newLimit) => {
        setLimit(newLimit)
        setPage(1)
    }

    const setPageHandler = (event, value) => {
        setPage(value)
    }

    console.log(data)
    return (
        <>  
        <div className='searchandfiltersandgroups'>
            <div className='buttongroups'>
                <p>Показать:</p>
                <BasicSelect onChange={setLimitHandler} />
            </div>
            <div className='search'>
                <Search />
            </div>
        </div>
        <div className='catalog'>
            {products.map(item=><Card key={item.id} {...item}/>)}
        </div>
        <div className='paginator'>
            <Pagination count={totalPages} page={page} onChange={setPageHandler} variant="outlined" shape="rounded" />
        </div>
        </>
        
    ) 
}