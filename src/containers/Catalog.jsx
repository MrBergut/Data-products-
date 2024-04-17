import Card from '../components/Card';
import data from './ololo';
import React, { useCallback, useEffect, useState } from 'react';

export default function Catalog(props) {
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(0)
    const [skip, setSkip] = useState(0)
    const [query, setQuery] = useState('')

    const getProductsByQuery = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products/search')
        query && url.searchParams.set('q', query)
        const productsData = await fetch(url).then(res => res.json())
        setProducts(productsData.products)
    }, [query])

    const getProductsList = useCallback(async () => {
        const url = new URL('https://dummyjson.com/products')
        limit && url.searchParams.set('limit', limit)
        skip && url.searchParams.set('skip', skip)
        const productsData = await fetch(url).then(res => res.json())
        console.log('===ASDE===', productsData)
        setProducts(productsData.products)
    }, [limit, skip])

    useEffect(() => {
        getProductsList()
    }, [])

    useEffect(() => {
        getProductsByQuery()
    }, [query])

    console.log(data)
    return (data.products??[]).map(item=><Card {...item}/>)
}