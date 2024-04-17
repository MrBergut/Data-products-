import '../styles/content.css';
import Catalog from './Catalog';
import Search from '../components/Search';
import Pagination from '@mui/material/Pagination';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

export default function Content() {
    return (
        <main className='content'>
            <div className='searchandfiltersandgroups'>
                <div className='buttongroups'>
                    <p>Показать:</p>
                    <ButtonGroup variant="contained" aria-label="Basic button group" sx={{ height: 26, marginLeft: 1 }}>
                        <Button>12 товаров</Button>
                        <Button>24 товара</Button>      
                    </ButtonGroup>
                </div>
                <div className='search'>
                    <Search />
                </div>
            </div>
            <div className='catalog'>
                <Catalog />
            </div>
            <div className='paginator'>
                <Pagination count={10} variant="outlined" shape="rounded" />
            </div>
        </main>
    );
}