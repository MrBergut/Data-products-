import '../styles/content.css';
import Catalog from './Catalog';


export default function Content() {
    return (
        <main className='content'>
            <div className='catalog'>
                <Catalog />
            </div>
        </main>
    );
}