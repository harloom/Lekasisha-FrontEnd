import { categoryConstants } from '../_constants';

export function categorys(state = {}, action) {
  switch (action.type) {
    case categoryConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case categoryConstants.GETALL_SUCCESS:
      return {
        items: action.categorys
      };
    case categoryConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case categoryConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case categoryConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(item => item.id !== action.id)
      };
    case categoryConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = item;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state
  }
}