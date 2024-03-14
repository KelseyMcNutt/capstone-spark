import { useEffect, useState } from "react"
import { getAllTypes } from "../../services/FIlterServices"
import './FilterCards.css'


export const FilterBar = ({setFilteredCardsType, setFilteredCardsPrice, setFilteredCardsLength}) => {
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

    const handleLengthChange = (event) => {
        const selectedLength = event.target.value
        setFilteredCardsLength(selectedLength)
    }

    
    return (
       <div className="filter-withtitle">
        <h3>Filter By</h3> 
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
    
        <label></label>
       <select className="lengths" onChange={handleLengthChange}>
       <option value="" className="length">All Lengths</option>
        <option value={2}>2 hours and under</option>
        <option value={3}>3 hours and under</option>
        <option value={4}>4 hours and under</option>
        </select>
        </div>
        </div>
    )
}