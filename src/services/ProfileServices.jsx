export const getProfileInfo = (userId) => {
    return fetch(`http://localhost:8000/Users?id=${userId}&_embed=posts&_embed=favorites`).then(res => res.json())
}

export const getPostsbyUserId = (userId) => {
    return fetch(`http://localhost:8000/Posts?userId=${userId}&_expand=card`).then(res => res.json())
}

export const updateProfile = (updatedInfo) => {
    const {id, email, username, profilePic } = updatedInfo
    return fetch(`http://localhost:8000/Users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({id, email, username, profilePic}),
    })
}

export const getSimpleProfileInfo = (userId) => {
    return fetch(`http://localhost:8000/Users/${userId}`).then(res => res.json())
}