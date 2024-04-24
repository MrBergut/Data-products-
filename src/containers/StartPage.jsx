import { Link } from "react-router-dom";

export default function StartPage() {
    return (<>
        Ты не робот?
        <Link to='/catalog'>Нет</Link>
    </>)
}