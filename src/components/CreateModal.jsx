import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from './Input';

import { useState, useEffect } from 'react';

import '../styles/createmodal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function CreateModal({ open, onClose, onCreate }) {
    const [title, setTitle] = useState('')
    const [description, setDescriprion] = useState('')
    const [price, setPrice] = useState('')
    const isFormValid = title.trim() !== '' && description.trim() !== '' && price.trim() !== '';

    useEffect(() => {
        setTitle('')
        setDescriprion('')
        setPrice('')
    }, [open])

    const handleCreate = () => {
        if (isFormValid) {
            onCreate({ title: title, description: description, price: price })
            onClose()
            console.log(`Создана карточка с данными: название: ${title}, описание: ${description}, цена: ${price}$ `)
        }
    }

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Создать карточку
                </Typography>
                <div className='description'>
                    <p>Название</p>
                    <Input className='createmodalinput' placeholder='Название' value={title} onChange={(e) => setTitle(e.target.value)} />
                    <p>Описание</p>
                    <Input className='createmodalinput' placeholder='Описание' value={description} onChange={(e) => setDescriprion(e.target.value)} />
                    <p>Цена</p>
                    <Input className='createmodalinput' type='number' placeholder='Цена' value={price} onChange={(e) => setPrice(e.target.value)} />
                    <div className='createbutton'>
                        <Button variant='text' onClick={onClose} size='small' sx={{ color: '#000', marginRight: 1 }}>
                            Отмена
                        </Button>
                        <Button variant='contained' size='small' onClick={handleCreate} disabled={!isFormValid}>
                            Создать
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}