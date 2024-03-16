import { useParams } from "react-router-dom"
import { getDetailsByPostId } from "../../services/DetailsServices"
import { useEffect, useState } from "react"
import { deletePost } from "../../services/DetailsServices"
import { Link } from "react-router-dom"

export const Details = () => {
    const [details, setDetails] = useState({})
    const {postId} = useParams()
   
    
    useEffect(() => {
        getDetailsByPostId(postId).then((data) => {
            const detail = data[0]
            setDetails(detail)
        })
    }, [postId])
    console.log(postId)

    const handleDelete = async (event) => {
        await deletePost(event.target.value)

    }
    
    return (
        <div className="Posts">
                   <>
                    <Link to="/profile"><button value={details.id} onClick={handleDelete}>trash</button></Link>
                    <div className="title">{details.card?.title}</div>
                    <img src={details.picture} alt="Post" className="picture" />
                    <div className="desciption">{details.card?.description}</div>
                    <div className="date">{details.date}</div>
                    </>
        </div>
    )
}