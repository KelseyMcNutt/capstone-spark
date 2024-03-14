export const getAllPosts = () => {
    return fetch("http://localhost:8000/Posts?_expand=user&_expand=card").then(res => res.json())
}