import React, { useCallback, useRef, useState } from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Rating from '@mui/material/Rating';
import DeleteModal from './DeleteModal';
import '../styles/card.css';
import SuccessModal from './SuccessModal';

export default function CardComponent({ id = '', title = '', description = '', price = 0, discountPercentage = 0, rating = 0, stock = 0, brand = '', category = '', thumbnail = '', refreshCatalog }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openSuccessModal, setOpenSuccessModal] = useState(false)



    const handleDelete = async () => {
        setOpenDeleteModal(false)
        console.log('Был отправлен запрос на удаление карточки', id)
        const response = await fetch(`https://dummyjson.com/products/${id}`, {method: 'DELETE'})
        if (response.ok) {
            suсcessResponse()
            refreshCatalog()
        } else {
            failResponse()
        }
    }

    const failResponse = () => {
        alert('Не удалось')
    }

    const suсcessResponse = () => {
        console.log('Ответ успешен!')
        setOpenSuccessModal((oldValue) => true)
    }

    const closeSuccessModal = () => {
        // setOpenSuccessModal(false);
        console.log('closeSuccessModal')
    }

    const handleDeleteButtonClick = () => {
        setOpenDeleteModal(true)
    }

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false)
    }

    return (
        <>
            <DeleteModal
                open={openDeleteModal}
                onClose={handleCloseDeleteModal}
                onDelete={handleDelete}
            />
            
            <SuccessModal
                open={openSuccessModal}
                onClose={closeSuccessModal}
            />
            <Card className='card' sx={{ width: 400, minHeight: 500, margin: 4 }}>
            <div>{openSuccessModal?'1':'0'}</div>
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
                <div className='button'>
                    <Button color='primary' size='large' sx={{ width: 100, margin: 1, marginRight: 2 }}>
                        купить
                    </Button>
                </div>
            </Card>
        </>
    )
}