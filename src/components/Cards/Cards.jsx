import { useState , useEffect } from "react"
import { getAllCards } from "../../services/CardsService"
import './Cards.css'
import { FilterBar } from "../Filter/FilterCards"
import { SaveCard } from "../../services/FavoritesServices"
import { getAllFavorites } from "../../services/FavoritesServices"

export const Cards = ({currentUser}) => {
    const [allCards, setAllCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [selectedPrice, setSelectedPrice] = useState("")
    const [selectedType, setSelectedType] = useState("")
    const [selectedLength, setSelectedLength] = useState("")
    const [favorites, setFavorites] = useState([])

   
   
   
    useEffect(() => {
        reRender()
    } ,[])

    useEffect(() => {
        getAllFavorites().then((allFavesArray) => {
            setFavorites(allFavesArray)
        })
    }, [])

    const reRender = () => {
        getAllCards().then((allCardsArray) => {
            setAllCards(allCardsArray)
        })
    }

    
    useEffect(() => {
        let filteredResult = allCards
    
        
        if (selectedType !== "") {
           filteredResult = filteredResult.filter((card) => card.type.type === selectedType)
        }

        if (selectedPrice !== "") {
           filteredResult = filteredResult.filter((card) => card.price <= selectedPrice)
        }

        if(selectedLength !== ""){
            filteredResult = filteredResult.filter((card) => card.hours <= selectedLength)
        }

        setFilteredCards(filteredResult)
    }, [allCards, selectedType, selectedPrice, selectedLength])
    


    const handleTypeChange = (selectedType) => {
        setSelectedType(selectedType)
    }

    const handlePriceChange = (selectedPrice) => {
        setSelectedPrice(selectedPrice)
    }

    const handleLengthChange = (selectedLength) => {
        setSelectedLength(selectedLength)
    }


    const handleLike = (cardId) => {
        if (!favorites.includes(cardId)) {
            SaveCard(currentUser.id, cardId).then(() =>{
                reRender()
               
            })
            
        }
    }



    return (
       <div className="filter-allcards"> 
       <div className="all-cards">
        {filteredCards.map((card) => {
            return (
                <div className="card" key={card.id}>
                    <div className="card-type">{card.type.type}</div>
                    <button onClick={() => handleLike(card.id)}>Save</button>
                    <div className="card-title"><h3>{card.title}</h3></div>
                    <div className="card-description">{card. description}</div>
                    <footer className="footer">
                    <div className="card-hours">{card.hours} hours</div>
                    <div className="card-price">${card.price}</div>
                    </footer>
                </div>
            )
        })}
        </div>
        
        <FilterBar setFilteredCardsType={handleTypeChange} setFilteredCardsPrice={handlePriceChange} setFilteredCardsLength={handleLengthChange}/>

        </div>
    )
}

