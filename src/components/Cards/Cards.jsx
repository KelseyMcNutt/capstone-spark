import { useState , useEffect } from "react"
import { getAllCards } from "../../services/CardsService"
import './Cards.css'
import { FilterBar } from "../Filter/FilterCards"
import { SaveCard } from "../../services/FavoritesServices"
import { getAllFavorites } from "../../services/FavoritesServices"
import { FaHeart } from "react-icons/fa"

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
            SaveCard(currentUser.id, cardId).then(() =>{
                reRender()
               
            })
    }


    return (
        <div className="filter-allcards"> 
          <div className="all-cards">
            {filteredCards.map((card) => {
              
              let backgroundImage = ""
              if (card.type.type === 'partner') {
                backgroundImage = `url(https://i.pinimg.com/736x/67/8f/12/678f12ad0389deb5c7cc9b931a3af1ab.jpg)`
              } else if (card.type.type === 'friendship') {
                backgroundImage = `url(https://cdn4.vectorstock.com/i/1000x1000/90/68/gold-stars-on-a-white-background-vector-24999068.jpg)`
              } else if (card.type.type === 'solo') {
                backgroundImage = `url(https://garden.spoonflower.com/c/12155950/p/f/m/3xrI538kT3_T7SKUViU6OoByPDnArNfg2oQ7cCyHe2083OLNkD5DMU3XZw/Pastel%20Blue%20Small%20Flower%20Pattern%2010%20Inch%20Repeat.jpg)`;
              }


    return (
                <div className="card" key={card.id} style={{ backgroundImage }}>
                    
                    <div className="card-top">
                    <div className="card-type">{card.type.type}</div>
                    <button onClick={() => handleLike(card.id)}><FaHeart /></button>
                    </div>
                    
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



