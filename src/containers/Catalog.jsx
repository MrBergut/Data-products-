import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import ButtonMUI from '@mui/material/Button';

import Search from '../components/Search';
import Card from '../components/Card';
import BasicSelect from '../components/BasicSelect';
import CreateModal from '../components/CreateModal';
import SuccessModal from '../components/SuccessModal';

import { useSearchParams } from 'react-router-dom';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import '../styles/catalog.css';

export default function Catalog(props) {
    const [searchParams, setSearchParams] = useSearchParams()
    const [products, setProducts] = useState([])
    const [limit, setLimit] = useState(Number(searchParams.get('limit')) || 12)
    const [query, setQuery] = useState(searchParams.get('q') ?? '')
    const [page, setPage] = useState(Number(searchParams.get('page')) || 1)
    const [isLoading, setIsLoading] = useState(true)
    const [totalPages, setTotalPages] = useState(1)
    const isInitialMount = useRef(true)

    const [openCreateModal, setOpenCreateModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)

    const spinner = isLoading ? <CircularProgress /> : null

    const getProductsByQuery = useCallback(async () => {
        if (query.trim() !== '') {
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

    const handleOpenCreateModal = useCallback(() => {
        setOpenCreateModal(true)
    },)


    const handleCreate = useCallback(async (productsData) => {
        setOpenCreateModal(false)
        const response = await fetch('https://dummyjson.com/products/add', { method: "POST", body: JSON.stringify(productsData) })
        if (response.ok) {
            suсcessResponse()
        } else {
            failResponse()
        }
        console.log('Создание продукта:', productsData)
    }, [suсcessResponse])

    const suсcessResponse = useCallback(() => {
        console.log('Ответ успешен!')
        setOpenSuccessModal(true)
    }, [])

    const failResponse = () => {
        alert('Не удалось') // не будем делать модалку, так как на этом API не может быть провала
    }

    const closeSuccessModal = useCallback(() => {
        refreshCatalog()
        setOpenSuccessModal(false);
    }, [])

    const refreshCatalog = useCallback(() => {
        getProductsList();
        console.log('Обновление каталога...')
    }, []);

    useEffect(() => {
        //TODO: Делаешь тут setQuery и в нем сбрасываешь q на пустую строку
        setQuery('')
        getProductsList()
    }, [limit, page])

    useEffect(() => {
        //if (!isInitialMount.current) {
        getProductsByQuery()
        //}
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
            <SuccessModal open={openSuccessModal} onClose={closeSuccessModal} message='Успешно создано' />
            <CreateModal open={openCreateModal} onClose={() => setOpenCreateModal(false)} onCreate={handleCreate} />
            <div className='catalog'>
                <div className='searchandsortingandlimit'>
                    <div className='addbutton'>
                        <ButtonMUI variant='contained' sx={{ height: 28, width: 90, marginLeft: 4 }} onClick={handleOpenCreateModal} >
                            Добавить
                        </ButtonMUI>
                    </div>
                    <div className='buttongroups'>
                        <p>Показать:</p>
                        <BasicSelect value={limit} onChange={setLimitHandler} />
                    </div>
                    <div className='search'>
                        <Search value={query} onSearch={searchHandler} />
                    </div>
                </div>
                {spinner || (<>
                    <div className='catalog'>
                        {products.map(item => <Card key={item.id} {...item} refreshCatalog={refreshCatalog} />)}
                    </div>
                    <div className='paginator'>
                        <Pagination count={totalPages} page={page} onChange={setPageHandler} variant="outlined" shape="rounded" />
                    </div>
                </>)}
            </div>
        </>
    )
}