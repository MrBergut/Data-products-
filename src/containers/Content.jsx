import '../styles/content.css';
import Catalog from './Catalog';
import Search from '../components/Search';

export default function Content() {
    return (
        <main className='content'>
            <div className='searchandfilters'>
                <Search />
            </div>
            <div className='catalog'>
                <Catalog />
            </div>
        </main>
    );
}
