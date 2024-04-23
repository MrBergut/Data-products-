import React, { useCallback, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Fab } from '@mui/material';
import Rating from '@mui/material/Rating';

import EditModal from './EditModal';
import DeleteModal from './DeleteModal';
import SuccessModal from './SuccessModal';

import editicon from '../assets/icons8-edit.svg';
import '../styles/card.css';

export default function CardComponent({ id = '', title = '', description = '', price = 0, discountPercentage = 0, rating = 0, stock = 0, brand = '', category = '', thumbnail = '', refreshCatalog }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openSuccessDeleteModal, setOpenSuccessDeleteModal] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [openSuccessEditModal, setOpenSuccessEditModal] = useState(false)


    const handleDelete = useCallback(async () => {
        setOpenDeleteModal(false)
        console.log('Был отправлен запрос на удаление карточки', id)
        const response = await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
        if (response.ok) {
            suсcessDeleteResponse()
        } else {
            failDeleteResponse()
        }
    }, [])

    const handleEdit = useCallback(async (cardData) => {
        setOpenEditModal(false)
        console.log('Был отправлен запрос на изменение карточки', id)
        const response = await fetch(`https://dummyjson.com/products/${id}`, { method: 'PUT', body: JSON.stringify(cardData) })
        if (response.ok) {
            suсcessEditResponse()
        } else {
            failEditResponse()
        }

    }, [])


    const suсcessDeleteResponse = useCallback(() => {
        console.log('Ответ успешен!')
        setOpenSuccessDeleteModal(true)
    }, [handleDelete])

    const suсcessEditResponse = useCallback((editedData) => {
        console.log('Ответ успешен!')
        console.log('Изменения сохранены:', editedData)
        setOpenSuccessEditModal(true)
    }, [handleEdit])


    const failDeleteResponse = useCallback(() => {
        alert('Не удалось') // не будем делать модалку, так как на этом API не может быть провала
    }, [handleDelete])

    const failEditResponse = useCallback(() => {
        alert('Не удалось') // не будем делать модалку, так как на этом API не может быть провала
    }, [handleEdit])


    const closeSuccessDeleteModal = useCallback(() => {
        refreshCatalog()
        setOpenSuccessDeleteModal(false);
        console.log('closeSuccessDeleteModal')
    }, [])

    const closeSuccessEditModal = useCallback(() => {
        refreshCatalog()
        setOpenSuccessEditModal(false);
        console.log('closeSuccessEditModal')
    }, [])


    const handleDeleteButtonClick = () => {
        setOpenDeleteModal(true)
    }

    const handleEditButtonClick = () => {
        setOpenEditModal(true)
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }



    return (
        <>
            <SuccessModal open={openSuccessEditModal} onClose={closeSuccessEditModal} message='Успешно изменено' />
            <EditModal open={openEditModal} onClose={() => setOpenEditModal(false)} cardData={{ id, title, description, price }} onEdit={handleEdit} />

            <SuccessModal open={openSuccessDeleteModal} onClose={closeSuccessDeleteModal} message='Успешно удалено' />
            <DeleteModal open={openDeleteModal} onClose={handleCloseDeleteModal} onDelete={handleDelete} />

            <Card className='card' sx={{ width: 400, minHeight: 500, margin: 4 }}>
                <div className='deletebutton'>
                    <Button variant='text' color='error' onClick={handleDeleteButtonClick} sx={{ fontSize: 10 }}>
                        удалить
                    </Button>
                </div>
                <div className='thumbnail'>
                    <img src={thumbnail} alt={thumbnail} />
                </div>
                <CardHeader className='cardheader' title={title} subheader={description} />
                <div className='priceandrating'>
                    <p className='price'>{price}$</p>
                    <Rating value={rating} />
                </div>
                <div className='buttons'>
                    <Fab color='primary' size='small' sx={{ marginLeft: 2 }} onClick={handleEditButtonClick}>
                        <img src={editicon} alt='editicon' />
                    </Fab>
                    <Button color='primary' size='large' sx={{ width: 100, margin: 1, marginRight: 2 }}>
                        купить
                    </Button>
                </div>
            </Card>
        </>
    )
}