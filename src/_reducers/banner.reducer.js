import { bannerConstants } from '../_constants';

export function banners(state = {}, action) {
  switch (action.type) {

    case bannerConstants.CREATE_REQUEST:
      return {
        onRequest:true,
        onSuccess : false,
        items:state.items
      }
    
    case bannerConstants.CREATE_FAILURE:
      return {
        onRequest : false,
        onSuccess : false,
        items:state.items
      }

    case bannerConstants.CREATE_SUCCESS:
      return{
        onRequest:false,
        onSuccess : true,
        // ...state,
        items:state.items,
        name: '',
        backgroundColor: '',
        image:null,
        submitted: false,
        allValid: false
      }  

      case bannerConstants.EDIT_REQUEST:
        return {
          onRequestEdit:true,
          onSuccessEdit : false,
          items:state.items
        }
      
      case bannerConstants.EDIT_FAILURE:
        return {
          onRequestEdit : false,
          onSuccessEdit : false,
          items:state.items
        }
  
      case bannerConstants.EDIT_SUCCESS:
        return{
          onRequestEdit:false,
          onSuccessEdit : true,
          // ...state,
          items:state.items,
        }  
  


    case bannerConstants.GETALL_REQUEST:
      return {
        loading: true
      };
    case bannerConstants.GETALL_SUCCESS:
      return {
        items: action.banners
      };
    case bannerConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case bannerConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(item =>
          item._id === action.id
            ? { ...item, deleting: true }
            : item
        )
      };
    case bannerConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(item => item._id !== action.id)
      };
    case bannerConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(item => {
          if (item._id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...itemCopy } = item;
            // return copy of user with 'deleteError:[error]' property
            return { ...itemCopy, deleteError: action.error };
          }

          return item;
        })
      };
    default:
      return state
  }
}