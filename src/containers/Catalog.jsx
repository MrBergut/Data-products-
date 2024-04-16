import Card from '../components/Card';
import data from './ololo';
import React from 'react';

export default function Catalog(props) {
    // const products = JSON.parse(data)
        console.log(data)
        return (data.products??[]).map(item=><Card {...item}/>)
}