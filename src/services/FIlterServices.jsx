export const getAllTypes = () => {
    return fetch("http://localhost:8000/types").then(res => res.json())
}