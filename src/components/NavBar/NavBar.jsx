import './NavBar.css'
import { Link } from 'react-router-dom'
import { getSimpleProfileInfo } from '../../services/ProfileServices'
import { useEffect, useState } from 'react'



export const NavBar = ({currentUser}) => {

const [profileInfo, setProfileInfo] = useState({})

useEffect(() => {
    getSimpleProfileInfo(currentUser.id).then((info) => {
        setProfileInfo(info)
    })
}, [currentUser])


return (
    <>
    <ul className='navbar'>
        <div className='card-post'>
        <Link to='/'><li className='navbar-item cards'>Cards</li></Link>
        <Link to='/posts'><li className='navbar-item posts'>Posts</li></Link>
        </div>
        <div className='logo-div'><li className='navbar-item logo'><h2>Spark</h2></li></div>
        <Link to='/profile'><li className='navbar-item propic'><img className="propic" src={profileInfo.profilePic} alt="profile pic"/></li></Link>

    </ul>
    </>
)
}