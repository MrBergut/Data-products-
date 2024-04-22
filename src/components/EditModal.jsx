import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Input from './Input';

import { useState, useEffect, useCallback } from 'react';
import InputFileUpload from './InputFileUpload';

import '../styles/editmodal.css';

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

export default function EditModal({ open, onClose, cardData, onEdit }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const isFormValid = title.trim() !== '' && description.trim() !== '' && price !== '';

    useEffect(() => {
        if (cardData) {
            setTitle(cardData.title);
            setDescription(cardData.description);
            setPrice(cardData.price);
        }
    }, [cardData]);

    const handleEdit = useCallback(() => {
        if (isFormValid) {
            console.log('Изменения сохранены:', { title: title, description, price });
            onEdit({ title: title, description, price });
            onClose();
        }
    }, [isFormValid]);

    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Редактировать карточку
                </Typography>
                <div className='description'>
                    <InputFileUpload />
                    <p>Название</p>
                    <Input
                        className='editmodalinput'
                        placeholder='Название'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <p>Описание</p>
                    <Input
                        className='editmodalinput'
                        placeholder='Описание'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <p>Цена</p>
                    <Input
                        className='editmodalinput'
                        placeholder='Цена'
                        value={price}
                        type='number'
                        onChange={(e) => setPrice(e.target.value)}
                    />
                    <div className='editbutton'>
                        <Button
                            variant='text'
                            onClick={onClose}
                            size='small'
                            sx={{ color: '#000', marginRight: 1 }}
                        >
                            Отмена
                        </Button>
                        <Button
                            variant='contained'
                            size='small'
                            onClick={handleEdit}
                            disabled={!isFormValid}
                        >
                            Подтвердить
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}