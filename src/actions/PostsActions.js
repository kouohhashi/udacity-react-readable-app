export const GET_POSTS = 'GET_POSTS'
export const UPDATE_POST = 'UPDATE_POST'
export const DELETE_POST = 'DELETE_POST'

export function apiGetPosts ({posts}) {
  return {
    type: GET_POSTS,
    posts
  }
}

export function apiUpdatePost ({post}) {
  return {
    type: UPDATE_POST,
    post
  }
}

export function apiDeletePost ({postId}) {
  return {
    type: DELETE_POST,
    postId
  }
}
