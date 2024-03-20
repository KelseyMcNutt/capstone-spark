import { useEffect, useState } from "react"
import { MakeNewPost } from "../../services/PostsServices"
import { useNavigate } from "react-router-dom"
import { getFavoritesByUserId } from "../../services/FavoritesServices"
import './newPost.css'
import { Link } from "react-router-dom"

export const NewPost = ({currentUser}) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userId: currentUser.id,
    cardId: "",
    picture: "",
    date: "",
  })

  const [favorites, setFavorites] = useState([])


useEffect(() => {
    getFavoritesByUserId(currentUser.id).then((favorites) => {
        setFavorites(favorites)
    })
}, [currentUser])


  const handleChange = (event) => {
    const { name, value } = event.target
    if (name === "cardId") {
        const selectedCardId = parseInt(value)
        const selectedFavorite = favorites.length > 0 ? favorites.find((favorite) => favorite.cardId === selectedCardId) : null
        const card = selectedFavorite ? selectedFavorite.card : null
    setFormData({ ...formData, [name]: selectedCardId, card: card })
  } else {
    setFormData({ ...formData, [name]: value, card: formData.card})
  }
}

  const handleSubmit = async (e) => {
    e.preventDefault()
      await MakeNewPost(formData, currentUser.id)
      navigate("/profile")
  }

  const previewPost = (
    <div className="post-preview">

      <div className="post">
      <h3>{formData.card?.title}</h3>
      <p>{formData.card?.description}</p>
        <img src={formData.picture} alt="Post" className="picture-preview" />
        <p>Date: {formData.date}</p>
      </div>
    </div>
  )

  return (
    <>
    <Link to="/profile"><div>back</div></Link>
    <div className="new-post-form">
      
      <div className="form">
        <form onSubmit={handleSubmit}>
            <div>
            <label htmlFor="cardId">Card Title:</label>
            <select
                id="cardId"
                name="cardId"
                value={formData.cardId}
                onChange={handleChange}
                required
            >
                <option value="">Select a card</option>
                {favorites.map((favorite) => (
                <option key={favorite.id} value={favorite.cardId}>
                    {favorite.card.title}
                </option>
                ))}
            </select>
            </div>
            <div>
            <label htmlFor="pictureUrl">Picture URL:</label>
            <input
                type="text"
                id="pictureUrl"
                name="picture"
                value={formData.picture}
                onChange={handleChange}
                required
            />
            </div>
            <div>
            <label htmlFor="date">Date:</label>
            <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
            />
            </div>
            <button type="submit">Submit</button>
        </form>
      </div>
      <div className="prev">
        {previewPost}
      </div>
    </div>
    </>
  )
}
