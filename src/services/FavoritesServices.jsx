export const SaveCard = (userId, cardId) => {
    return fetch("http://localhost:8000/favorites", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userId: userId,
            cardId: cardId
        })
    }).then(res => res.json())

}

export const getAllFavorites = () => {
    return fetch("http://localhost:8000/favorites").then(res => res.json())
}

export const getFavoritesByUserId = (userId) => {
    return fetch(`http://localhost:8000/favorites?userId=${userId}&_expand=card`).then(res => res.json())
}

export const deleteFavorite = (favoriteId) => {
    return fetch(`http://localhost:8000/favorites/${favoriteId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }

    })
}