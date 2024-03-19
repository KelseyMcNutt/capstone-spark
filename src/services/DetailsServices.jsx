export const getDetailsByPostId = (PostId) => {
    return fetch(`http://localhost:8000/Posts?id=${PostId}&_expand=card`).then(res => res.json())
}


export const deletePost = (PostId) => {
    return fetch(`http://localhost:8000/Posts/${PostId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }

    })
}

export const updatePost = (updatedPost) => {
    const {id, date, picture, cardId, userId} = updatedPost
    return fetch(`http://localhost:8000/Posts/${id}` , {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, date, picture, cardId, userId }),
    })
  
}