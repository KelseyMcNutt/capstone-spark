export const getAllCards = () => {
    return fetch("http://localhost:8000/cards?&_expand=type").then(res => res.json())
}