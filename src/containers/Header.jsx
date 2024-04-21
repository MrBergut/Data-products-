import React from 'react';

import Link from '@mui/material/Link';

import logo from '../assets/logo.png';
import useravatar from '../assets/useravatar.png';

import '../styles/header.css';

export default function Header() {
    return (
        <header className='header'>
            <div className='headerLogo'>
                <img src={logo} alt='logo' width='60px' />
                <h1 className='header-logo-text'>Different stuff</h1>
            </div>
            <div className='header-search'>
                <Link variant='inherit' underline='hover' color='primary' sx={{ cursor: 'pointer', margin: 2 }}>About Us</Link>
                <Link variant='inherit' underline='hover' color='primary' sx={{ cursor: 'pointer', margin: 2 }}>Documentation</Link>
                <Link variant='inherit' underline='hover' color='primary' sx={{ cursor: 'pointer', margin: 2 }}>Contact Information</Link>
            </div>
            <div className='user'>
                <img className='user-avatar' src={useravatar} alt='useravatar' width='40px' />
                <p className='user-name'>User</p>
            </div>
        </header>
    );
};