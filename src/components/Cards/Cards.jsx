import { useState , useEffect } from "react"
import { getAllCards } from "../../services/CardsService"
import './Cards.css'
import { FilterBar } from "../Filter/FilterCards"

export const Cards = () => {
    const [allCards, setAllCards] = useState([])
    const [filteredCards, setFilteredCards] = useState([])
    const [selectedPrice, setSelectedPrice] = useState("")
    const [selectedType, setSelectedType] = useState("")

   
   
   
    useEffect(() => {
        getAllCards().then((allCardsArray) => {
            setAllCards(allCardsArray)
        })
    } ,[])



    
    useEffect(() => {
        let filteredResult = allCards
    
        
        if (selectedType !== "") {
           filteredResult = filteredResult.filter((card) => card.type.type === selectedType)
        }

        if (selectedPrice !== "") {
           filteredResult = filteredResult.filter((card) => card.price <= selectedPrice)
        }

        setFilteredCards(filteredResult)
    }, [allCards, selectedType, selectedPrice])
    

    


    const handleTypeChange = (selectedType) => {
        setSelectedType(selectedType)
    }

    const handlePriceChange = (selectedPrice) => {
        setSelectedPrice(selectedPrice)
    }
    return (
       <>
       <FilterBar setFilteredCardsType={handleTypeChange} setFilteredCardsPrice={handlePriceChange}/>
       <div className="all-cards">
        {filteredCards.map((card) => {
            return (
                <div className="card" key={card.id}>
                    <div className="card-type">{card.type.type}</div>
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
        </>
    )
}

