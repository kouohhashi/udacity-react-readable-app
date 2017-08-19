export const GET_COMMENTS = 'GET_COMMENTS'
export const UPDATE_COMMENT = 'UPDATE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export function apiGetComments ({comments}) {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export function apiUpdateComment ({comment}) {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export function apiAddComment ({comment}) {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function apiDeleteComment ({commentId}) {
  return {
    type: DELETE_COMMENT,
    commentId
  }
}
