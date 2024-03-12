import { useEffect, useState } from "react"
import { getAllTypes } from "../../services/FIlterServices"
import { getAllCards } from "../../services/CardsService"

export const FilterBar = ({setFilteredCardsType, setFilteredCardsPrice}) => {
    const [types, setTypes] = useState([])
   

    useEffect(() => {
        getAllTypes().then((typesArray) => {
            setTypes(typesArray)
        })
    }, [])

    const handleTypeChange = (event) => {
        const selectedType = event.target.value
        setFilteredCardsType(selectedType)
    }

    const handlePriceChange = (event) => {
        const selectedPrice = event.target.value
        setFilteredCardsPrice(selectedPrice)

    }

    
    return (
        <div className="filter">
            <label></label>
       <select className="types" onChange={handleTypeChange} >
       <option value="" className="type">All Types</option>
            {types.map((type) => {
                return (
                    <option key={type.id} value={type.type} className="type">{type.type}</option>
                )
            })}
        </select>
        <label></label>
       <select className="prices" onChange={handlePriceChange}>
       <option value="" className="price">All Prices</option>
        <option value={0}>$0</option>
        <option value={30}>$30 and under</option>
        <option value={60}>$60 and under</option>
        <option value={100}>$100 and under</option>
        <option value={200}>$200 and under</option>
        </select>
        </div>
    )
}