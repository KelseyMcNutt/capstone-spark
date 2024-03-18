import { useState } from "react"
import { MakeNewPost } from "../../services/PostsServices"
import { useNavigate } from "react-router-dom"

export const NewPost = ({currentUser}) => {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    userId: currentUser.id,
    cardId: "",
    pictureUrl: "",
    date: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
      await MakeNewPost(formData, currentUser.id)
      navigate("/profile")
  }

  return (
    <div className="new-post-form">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="cardId">Card ID:</label>
          <input
            type="text"
            id="cardId"
            name="cardId"
            value={formData.cardId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="pictureUrl">Picture URL:</label>
          <input
            type="text"
            id="pictureUrl"
            name="pictureUrl"
            value={formData.pictureUrl}
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
  )
}
