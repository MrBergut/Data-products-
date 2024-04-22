import React, { useCallback, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { Fab } from '@mui/material';
import Rating from '@mui/material/Rating';

import DeleteModal from './DeleteModal';
import SuccessModal from './SuccessModal';

import '../styles/card.css';
import editicon from '../assets/icons8-edit.svg';
import EditModal from './EditModal';

export default function CardComponent({ id = '', title = '', description = '', price = 0, discountPercentage = 0, rating = 0, stock = 0, brand = '', category = '', thumbnail = '', refreshCatalog }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)

    const handleDelete = useCallback(async () => {
        setOpenDeleteModal(false)
        console.log('Был отправлен запрос на удаление карточки', id)
        const response = await fetch(`https://dummyjson.com/products/${id}`, { method: 'DELETE' })
        if (response.ok) {
            suсcessResponse()
        } else {
            failResponse()
        }
    }, [])

    const failResponse = useCallback(() => {
        alert('Не удалось') // не будем делать модалку, так как на этом API не может быть провала
    }, [handleDelete])

    const suсcessResponse = useCallback(() => {
        console.log('Ответ успешен!')
        setOpenSuccessModal(true)
    }, [handleDelete])

    const closeSuccessModal = useCallback(() => {
        refreshCatalog()
        setOpenSuccessModal(false);
        console.log('closeSuccessModal')
    }, [])

    const handleDeleteButtonClick = () => {
        setOpenDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    const handleEdit = () => {
        setOpenEditModal(true)
    }

    const handleEditSave = (editedData) => {
        console.log('Изменения сохранены:', editedData)
        refreshCatalog()
    }

    return (
        <>
            <EditModal open={openEditModal} onClose={() => setOpenEditModal(false)} cardData={{ id, title, description, price }} onEdit={handleEditSave} />
            <DeleteModal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onDelete={handleDelete}
            />
            <SuccessModal
                open={openSuccessModal}
                onClose={closeSuccessModal}
                message='Успешно удалено'
            />
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
                    <Fab color='primary' size='small' sx={{ marginLeft: 2 }} onClick={handleEdit}>
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