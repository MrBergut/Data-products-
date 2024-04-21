import '../styles/footer.css'
import logo from "../assets/logo.png"

export default function Footer() {
    return (
        <footer>
          <img src={logo} className='App-logo' alt='logo' />
          <p>Different stuff&copy; все права защищены</p>
        </footer>
    );
}