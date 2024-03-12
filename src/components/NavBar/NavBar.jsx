import './NavBar.css'

export const NavBar = () => {
return (
    <>
    <ul className='navbar'>
        <div className='card-post'>
        <li className='navbar-item cards'>Cards</li>
        <li className='navbar-item posts'>Posts</li>
        </div>
        <div className='logo-div'><li className='navbar-item logo'><h2>Spark</h2></li></div>
        <li className='navbar-item propic'>Profile Pic</li>

    </ul>
    </>
)
}