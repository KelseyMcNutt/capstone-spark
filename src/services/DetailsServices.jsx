export const getDetailsByPostId = (PostId) => {
    return fetch(`http://localhost:8000/Posts?id=${PostId}&_expand=card`).then(res => res.json())
}


export const deletePost = (PostId) => {
    return fetch(`http://localhost:8000/Posts?id=${PostId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        }

    })
}