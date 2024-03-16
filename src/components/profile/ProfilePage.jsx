import { useEffect, useState } from "react"
import { getProfileInfo } from "../../services/ProfileServices"
import { getPostsbyUserId } from "../../services/ProfileServices"
import './ProfilePage.css'
import { Link } from "react-router-dom"


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
            <Link to="/posts"><div className="back">Back</div></Link>
            <div className="edit">edit</div>
            <Link to="/login"><div className="logout">logout</div></Link>
            </div>
            
            <div className="middle">
            <div className="profilePic">{profileInfo?.profilePic}</div>
            <div className="username">{profileInfo?.username}</div>
            </div>
            
            <div className="bottom">
            <div className="newPost">+++</div>
            <Link to="/favorites"><div className="favorites">favorites</div></Link>
            <div className="datesTaken">Dates Taken: {userPosts.length}</div>
            </div>
       </header>
            <div className="Posts">
            {userPosts.map((posts) => {
                return(
            <Link to={`/profile/${posts.id}`}>
           <div key={posts.id}>
           
            <div className="post">
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
             
             </div>
             </Link>
            )
            })}
            </div>
            
        // </div>
    )
}