import {
  GET_COMMENTS,
  UPDATE_COMMENT,
  ADD_COMMENT,
  DELETE_COMMENT,
} from '../actions/CommentsActions'

function comments (state = {}, action) {

  const { comments, comment, commentId } = action

  switch (action.type) {
    case GET_COMMENTS :
      // const { comments } = action

      return {
        ...state,
        list:comments
      }
    case UPDATE_COMMENT:

      // const { comment } = action

      return {
        ...state,
        list: state.list.map((item) => {
          if ( item.id !== comment.id ) {
            return item
          } else {
            return comment
          }
        })
      }
    case ADD_COMMENT:
      // const { comment } = action

      let list1 = null;
      if (state.list && state.list.length > 0) {
        list1 = state.list.slice();
        list1.push(comment);
      } else {
        list1 = [comment]
      }

      return {
        ...state,
        list: list1
      }
    case DELETE_COMMENT:

      return {
        ...state,
        list: state.list.filter( (comment) => comment.id !== commentId )
      }

    default :
      return state
  }
}

export default comments
