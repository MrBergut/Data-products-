import Search from '../components/Search';

import logo from '../assets/logo.png';
import useravatar from '../assets/useravatar.png';

import '../styles/header.css';

export default function Header(){
    return (
        <header className='header'>
            <div className='headerLogo'>
                <img src={logo} alt='logo' width='60px'/>
                <h2 className='header-logo-text'>CPU store</h2>
            </div>
            <div className='header-search'>
                <Search />
            </div>
            <div className='user'>
                <img className='user-avatar' src={useravatar} alt='useravatar' width='40px'/>
                <p className='user-name'>User</p>
            </div>
        </header>
    );
};