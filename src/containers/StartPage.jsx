import { Link } from "react-router-dom";
import React, { useEffect } from 'react';


export default function StartPage() {
    return (<>
        Ты не робот?
        <Link to='/catalog'>Нет</Link>
    </>)
}