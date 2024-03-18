export const getAllPosts = () => {
    return fetch("http://localhost:8000/Posts?_expand=user&_expand=card").then(res => res.json())
}

export const MakeNewPost = (form, userId) => {
    return fetch(`http://localhost:8000/Posts?userId=${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }).then((res) => res.json())
}