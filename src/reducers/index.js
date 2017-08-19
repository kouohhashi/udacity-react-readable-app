import { combineReducers } from 'redux'
import comments from './commentsReducer'
import posts from './postsReducer'
import categories from './categoriesReducer'

export default combineReducers({
  categories, posts, comments
})
