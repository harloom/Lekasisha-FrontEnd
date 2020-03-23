import { productConstants } from '../_constants';

export function products(state = {}, action) {
  switch (action.type) {
    case productConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case productConstants.GETALL_SUCCESS:
      return {
        items: action.products
      };
    case productConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case productConstants.DELETE_REQUEST:
      // add 'deleting:true' property to item being deleted
      return {
         ...state,
         items: state.items.map(item =>
          item.id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case productConstants.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        items: state.items.filter(item => item.id !== action.id)
      };
    case productConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to item 
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === action.id) {
            // make copy of item without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of item with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }
 
          return item;
        })
      };

    case productConstants.CREATE_REQUEST:
        return{
          created:true
        }

     case productConstants.CREATE_SUCCESS:
       return{}   

     case productConstants.CREATE_FAILURE:
      return{}  

    default:
      return state
  }
}