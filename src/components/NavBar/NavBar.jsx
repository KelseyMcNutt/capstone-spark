import './NavBar.css'
import { Link } from 'react-router-dom'

export const NavBar = () => {
return (
    <>
    <ul className='navbar'>
        <div className='card-post'>
        <Link to='/'><li className='navbar-item cards'>Cards</li></Link>
        <Link to='/posts'><li className='navbar-item posts'>Posts</li></Link>
        </div>
        <div className='logo-div'><li className='navbar-item logo'><h2>Spark</h2></li></div>
        <Link to='/profile'><li className='navbar-item propic'>Profile Pic</li></Link>

    </ul>
    </>
)
}