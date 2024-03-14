export const getProfileInfo = (userId) => {
    return fetch(`http://localhost:8000/Users?id=${userId}&_embed=posts&_embed=favorites`).then(res => res.json())
}

export const getPostsbyUserId = (userId) => {
    return fetch(`http://localhost:8000/Posts?userId=${userId}&_expand=card`).then(res => res.json())
}