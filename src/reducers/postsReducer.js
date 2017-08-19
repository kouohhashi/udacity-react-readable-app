import {
  GET_POSTS,
  UPDATE_POST,
  DELETE_POST
} from '../actions/PostsActions'

function posts (state = {}, action) {

  const { posts, post, postId } = action

  switch (action.type) {

    case GET_POSTS :

      return {
        ...state,
        list:posts
      }

    case UPDATE_POST:

      return {
        ...state,
        list: state.list.map((item) => {
          if ( item.id !== post.id ) {
            return item
          } else {
            return post
          }
        })
      }

      case DELETE_POST:

        return {
          ...state,
          list: state.list.filter( (post) => post.id !== postId )
        }

    default :
      return state
  }
}

export default posts
