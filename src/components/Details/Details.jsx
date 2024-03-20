
import { useParams } from "react-router-dom"
import { getDetailsByPostId, updatePost } from "../../services/DetailsServices"
import { useEffect, useState } from "react"
import { deletePost } from "../../services/DetailsServices"
import { useNavigate } from "react-router-dom"

export const Details = () => {
    const [details, setDetails] = useState({})
    const [newDate, setNewDate] = useState("")
    const { postId } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        getDetailsByPostId(postId).then((data) => {
            const detail = data[0]
            setDetails(detail)
            setNewDate(detail.date)
        });
    }, [postId]);

    const handleDelete = (event) => {
        deletePost(event.target.value)
        navigate('/profile')
    }

    const handleSubmit = (event) => {
        event.preventDefault()
     
        const updatedPost = {
            id: details.id,
            date: newDate,
            picture: details.picture,
            cardId: details.cardId,
            userId: details.userId 
        }
    
        updatePost(updatedPost)
            .then(() => {
                console.log("Post updated successfully")
            })

            navigate('/profile')
        
            
    }

    return (
        <div className="post">
            <>
                <button value={details.id} onClick={handleDelete}>trash</button>
                <div className="title">{details.card?.title}</div>
                <img src={details.picture} alt="Post" className="picture" />
                <div className="description">{details.card?.description}</div>
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <input 
                            type="text" 
                            value={newDate} 
                            onChange={(e) => setNewDate(e.target.value)} 
                            required 
                        />
                        <button type="submit">Update Date</button>
                    </fieldset>
                </form>
            </>
        </div>
    );
};
