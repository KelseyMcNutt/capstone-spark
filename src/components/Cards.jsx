import { useState , useEffect } from "react"
import { getAllCards } from "../services/CardsService"


export const Cards = () => {
    const [allCards, setAllCards] = useState([])

    useEffect(() => {
        getAllCards().then((allCardsArray) => {
            setAllCards(allCardsArray)
        })
    } ,[])

    
    return (
        <div className="all-cards">
        {allCards.map((card) => {
            return (
                <div className="card">
                    <div className="card-type">{card.type.type}</div>
                    <div className="card-title">{card.title}</div>
                    <div className="card-description">{card. description}</div>
                    <div className="card-hours">{card.hours} hours</div>
                    <div className="card-price">${card.price}</div>
                </div>
            )
        })}
        </div>
    )
}