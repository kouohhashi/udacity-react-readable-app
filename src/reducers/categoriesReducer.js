import {
  GET_CATEGORIES,
} from '../actions/CategoriesActions'

function categories (state = {}, action) {
  switch (action.type) {
    case GET_CATEGORIES :
      const { categories } = action

      return {
        ...state,
        list:categories
      }
    default :
      return state
  }
}

export default categories
