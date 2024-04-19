// import '../styles/button.css';

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Rating from '@mui/material/Rating';

import '../styles/card.css';

export default function CardComponent({ id = '', title = '', description = '', price = 0, discountPercentage = 0, rating = 0, stock = 0, brand = '', category = '', thumbnail = '' }) {
    return (
        <Card className='card' sx={{ width: 400, minheight: 500, margin: 4 }}>
            <div className='thumbnail'>
                <img src={thumbnail} alt={thumbnail} />
            </div>
            <CardHeader className='cardheader' title={title} subheader={description}/>
            <div className='priceandrating'>
                <p className='price'>{price}$</p>
                <Rating value={rating} />
            </div>
            <div className='button'>
                <Button color='primary' size='large' sx={{ width: 100 }}>
                    <p>Buy</p>
                </Button>
            </div>
        </Card>
    );
}