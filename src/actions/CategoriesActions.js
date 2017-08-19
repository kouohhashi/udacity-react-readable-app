export const GET_CATEGORIES = 'GET_CATEGORIES'

export function apiGetCategories ({categories}) {
  return {
    type: GET_CATEGORIES,
    categories
  }
}
