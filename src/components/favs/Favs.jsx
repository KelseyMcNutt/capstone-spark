import { getAllCards } from "../../services/CardsService"
import { getFavoritesByUserId } from "../../services/FavoritesServices"
import { useEffect, useState } from "react"
import './Favs.css'
import { deleteFavorite } from "../../services/FavoritesServices"
import { Link } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa"
import { IoTrash } from "react-icons/io5"



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
        if (currentUser){
        deleteFavorite(event.target.value)
        getFavoritesByUserId(currentUser.id).then((FavsArray) => {
        setAllFavs(FavsArray)   
        
        })
    }
        
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
        <div className="all-cards">
            <Link to="/profile"><div className="back-link"><FaArrowLeft /></div></Link>
            {allFavs.map((fav) => {
                const favCardType = getFavCardType(fav.cardId)
                let backgroundImage = ""
                if (favCardType === 'partner') {
                    backgroundImage = `url(https://i.pinimg.com/736x/67/8f/12/678f12ad0389deb5c7cc9b931a3af1ab.jpg)`
                } else if (favCardType === 'friendship') {
                    backgroundImage = `url(https://cdn4.vectorstock.com/i/1000x1000/90/68/gold-stars-on-a-white-background-vector-24999068.jpg)`
                } else if (favCardType === 'solo') {
                    backgroundImage = `url(https://garden.spoonflower.com/c/12155950/p/f/m/3xrI538kT3_T7SKUViU6OoByPDnArNfg2oQ7cCyHe2083OLNkD5DMU3XZw/Pastel%20Blue%20Small%20Flower%20Pattern%2010%20Inch%20Repeat.jpg)`
                }
                
                return (
                    
                    <div className="card" key={fav.card.id} style={{backgroundImage}}>
                        
                    <div className="fav-top">
                        <div className="card-type">{favCardType}</div>
                        <button  value={fav.id} onClick={handleDelete}><IoTrash /></button>
                    </div>

                    <div className="card-title"><h3>{fav.card.title}</h3></div>
                    <div className="card-description">{fav.card.description}</div>
                    <footer className="footer">
                    <div className="card-hours">{fav.card.hours} hours</div>
                    <div className="card-price">${fav.card.price}</div>
                    </footer>
                    </div>
                
                )
            })}
        </div>
    )
}