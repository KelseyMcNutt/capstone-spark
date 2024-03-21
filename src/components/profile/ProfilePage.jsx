import { useEffect, useState } from "react"
import { getProfileInfo } from "../../services/ProfileServices"
import { getPostsbyUserId } from "../../services/ProfileServices"
import './ProfilePage.css'
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"


export const ProfilePage = ({currentUser}) => {
    const [profileInfo, setProfileInfo] = useState([])
    const [userPosts, setUserPosts] = useState([])
   
    
    useEffect(() => {
        if (currentUser?.id){
            getProfileInfo(currentUser.id).then((data)=> {
                const profileObj = data[0]
                setProfileInfo(profileObj)
                getPostsbyUserId(currentUser.id).then((postsArray) => {
                    setUserPosts(postsArray)
                })
            })
        }
    }, [currentUser])


    
    return(
        <div className="profile">
        <header className="userInfo">
            <div className="top">
            <Link to="/posts"><div className="back"><FaArrowLeft /></div></Link>
            <Link to="/edit"><div className="edit">Edit</div></Link>
            <Link to="/login"><div className="logout">Logout</div></Link>
            </div>
            
            <div className="middle">
                <img className="profilePic" src={profileInfo?.profilePic} alt="profilepic"/>
                <div className="username">{profileInfo?.username}</div>

            </div>
            
            <div className="bottom">
            <Link to="/newpost"><div className="newPost">+</div></Link>
            <Link to="/favorites"><div className="favorites">Favorites</div></Link>
            <div className="datesTaken">Dates Taken: {userPosts.length}</div>
            </div>
       </header>
            <div className="Posts">
            {userPosts.map((posts) => {
                return(
            <div key={posts.id}>
            <Link to={`/profile/${posts.id}`}>
           
           
            <div className="post" >
            <div className="title">
                {posts.card?.title}
             </div>
             <img src={posts.picture} alt="Post" className="picture" />
             <div className="description">
                {posts.card?.description}
             </div>
             <div className="date">
                {posts.date}
             </div>
             </div>
             
             </Link>
             </div>
            )
            })}
            </div>
            
        </div>
    )
}