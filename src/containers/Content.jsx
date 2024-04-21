import CircularProgress from '@mui/material/CircularProgress';
import Catalog from './Catalog';
import StartPage from './StartPage';
import NotFound from './NotFound';

import '../styles/content.css';

import { Routes, Route, useNavigation } from 'react-router-dom'

export default function Content() {
    const navigation = useNavigation();
    const spinner = (navigation.state == 'loading') ? <CircularProgress /> : null
    
    return (
        <main className='content'>
            {spinner}
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="catalog" element={<Catalog />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </main>
    );
}