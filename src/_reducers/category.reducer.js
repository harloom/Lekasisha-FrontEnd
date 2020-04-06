import { categoryConstants } from '../_constants';

export function categorys(state = {}, action) {
  switch (action.type) {

    case categoryConstants.CREATE_REQUEST:
      return {
        onRequest:true,
        onSuccess : false,
        items:state.items
      }
    
    case categoryConstants.CREATE_FAILURE:
      return {
        onRequest : false,
        onSuccess : false,
        items:state.items
      }

    case categoryConstants.CREATE_SUCCESS:
      return{
        onRequest:false,
        onSuccess : true,
        // ...state,
        items:state.items,
        name: '',
        backgroundColor: '',
        description: '',
        image:null,
        submitted: false,
        allValid: false
      }  

      case categoryConstants.EDIT_REQUEST:
        return {
          onRequestEdit:true,
          onSuccessEdit : false,
          items:state.items
        }
      
      case categoryConstants.EDIT_FAILURE:
        return {
          onRequestEdit : false,
          onSuccessEdit : false,
          items:state.items
        }
  
      case categoryConstants.EDIT_SUCCESS:
        return{
          onRequestEdit:false,
          onSuccessEdit : true,
          // ...state,
          items:state.items,
        }  
  


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
          item._id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case categoryConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(item => item._id !== action.id)
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