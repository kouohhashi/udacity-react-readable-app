const api = "http://localhost:5001"

// Generate a unique token for storing your bookshelf data on the backend server.
// This may not be needed for this project
let token = localStorage.token
if (!token) {
  // token has to be permanant ?
  token = localStorage.token = Math.random().toString(36).substr(-8)
  // token = localStorage.token = "__token__for__project__"
}

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

// get all categories
export const getCategories = () =>
  fetch(`${api}/categories`, { headers })
    .then(res => res.json())
    .then(data => data.categories)

// create a post
export const createPost = (post) =>
  fetch(`${api}/posts`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( post )
  }).then(res => res.json())


// get all posts
export const getAllPosts = () =>
  fetch(`${api}/posts`, { headers })
    .then(res => res.json())
    .then(data => data)

// get 1 specific posts
export const getPostsWithID = (postId) =>
  fetch(`${api}/posts/${postId}`, { headers })
    .then(res => res.json())
    .then(data => data)

export const deletePostsWithID = (postId) =>
  fetch(`${api}/posts/${postId}`, { method: 'DELETE', headers })
    .then(res => res.status)

export const updatePostsWithID = (postId, title, body ) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {title: title, body: body} )
  }).then(res => res.json())

// vote on post
export const voteOnPostWithID = (postId, option) =>
  fetch(`${api}/posts/${postId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {option: option} )
  }).then(res => res.json())

// add a comment
export const addComment = (comment) =>
  fetch(`${api}/comments`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( comment )
  }).then(res => res.json())

// get comments on a specific post
export const getCommentsWithPostID = (postId) =>
  fetch(`${api}/posts/${postId}/comments`, { headers })
    .then(res => res.json())
    .then(data => data)


// vote on comment
export const voteOnCommentWithID = (commentId, option) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {option: option} )
  }).then(res => res.json())


// deleteCommentWithID
export const deleteCommentWithID = (commentId) =>
  fetch(`${api}/comments/${commentId}`, { method: 'DELETE', headers })
    .then(res => res.status)


// update comment
export const updateCommentWithID = (commentId, param) =>
  fetch(`${api}/comments/${commentId}`, {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( param )
}).then(res => res.json())
