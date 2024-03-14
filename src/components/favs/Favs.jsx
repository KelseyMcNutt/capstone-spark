import { getAllCards } from "../../services/CardsService"
import { getFavoritesByUserId } from "../../services/FavoritesServices"
import { useEffect, useState } from "react"
import './Favs.css'
import { deleteFavorite } from "../../services/FavoritesServices"
import { Link } from "react-router-dom"



export const Favs = ({currentUser}) => {
    const [allFavs, setAllFavs] = useState([])
    const [cards, setCards] = useState([])
    
    useEffect(() => {
        getFavoritesByUserId(currentUser.id).then((FavsArray) => {
            setAllFavs(FavsArray)
        })
    }, [currentUser.id])

    useEffect(() => {
        getAllCards().then((cardsArray) => {
            setCards(cardsArray)
        })
    }, [])

    
    const handleDelete = (event) => {
        deleteFavorite(event.target.value)
        getFavoritesByUserId(currentUser.id).then((FavsArray) => {
            setAllFavs(FavsArray)
        })
    }
    
    
    const getFavCardType = (favCardId) => {
        for (const fav of allFavs) {
                if(fav.cardId === favCardId){
                    for (const card of cards) {
                        if (card.id === favCardId) {
                            return card.type.type
                        }
                    }
                }
            }
        }
    
    
    return (
        <div className="favs">
            <Link to="/profile"><div className="back-link">back</div></Link>
            {allFavs.map((fav) => {
                const favCardType = getFavCardType(fav.cardId)
                return (
                    // <div key={fav.id}>
                    <div className="card" key={fav.card.id}>
                    <div className="card-type">{favCardType}</div>
                    <button value={fav.id} onClick={handleDelete}>Trash</button>
                    <div className="card-title"><h3>{fav.card.title}</h3></div>
                    <div className="card-description">{fav.card.description}</div>
                    <footer className="footer">
                    <div className="card-hours">{fav.card.hours} hours</div>
                    <div className="card-price">${fav.card.price}</div>
                    </footer>
                    </div>
                // </div>
                )
            })}
        </div>
    )
}