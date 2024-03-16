import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/PostsServices"
import './Posts.css'

export const Posts = () => {
    const [allPosts, setAllPosts] = useState([])

    useEffect(() => {
        getAllPosts().then((allPostsArray) => {
            setAllPosts(allPostsArray)
        })
    }, [])
    
    
    
    
    return(
        <>
        <div className="Posts">
        {allPosts.map((post)=> {
            return(
             <div className="post">
             <header>
                <div className="profilePic">
                    {post.user.profilePic}
                </div>
                <div className="username">
                    {post.user.username}
                </div>
             </header>  
             <div className="title">
                {post.card.title}
             </div>
             <img src={post.picture} alt="Post" className="picture" />
             <div className="description">
                {post.card.description}
             </div>
             <div className="date">
                {post.date}
             </div>
             </div>
            
    
            )
        })}
        </div>
        </>
    )
}