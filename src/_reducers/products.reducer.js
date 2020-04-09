import { productConstants } from '../_constants';

export function products(state = {}, action) {
  switch (action.type) {

    
    case productConstants.EDIT_REQUEST:{
      return{
        ...state,
        editSuccess:false,
        requestEdit:true
      }
    }

    case productConstants.EDIT_SUCCESS:{
      // console.log(action.information);
      return {
        ...state,
        requestEdit:false,
        editSuccess:true,
        editFail:false,
      }
    }

    case productConstants.EDIT_FAILURE:{
      return {
        ...state,
        requestEdit:false,
        editFail:true,
        editSuccess:false,
      }
    }



    case productConstants.INFORMATION_REQUEST:{
      return{
        ...state,
        informationLoading:true
      }
    }

    case productConstants.INFORMATION_SUCCESS:{
      // console.log(action.information);
      return {
        ...state,
        informationSuccess:true,
        information : action.information,
      }
    }

    case productConstants.INFORMATION_FAILURE:{
      return {
        ...state,
      
      }
    }





    case productConstants.GETALL_REQUEST:
      return {
        ...state,
        loading: true
      };
    case productConstants.GETALL_SUCCESS:
      return {
        ...state,
        items: action.products
      };
    case productConstants.GETALL_FAILURE:
      return { 
        ...state,
        error: action.error
      };
    case productConstants.DELETE_REQUEST:
   
      return {
         ...state,
        
         status: state.items.docs.map(item =>
          item._id === action.id
            ? {deleting: true }
            : {deleting : false}
        )
      };
    case productConstants.DELETE_SUCCESS:
      // remove deleted item from state
      return {
        items:{
          ...state.items,
          docs:state.items.docs.filter(item => item._id !== action.id),
          totalDocs : state.items.totalDocs-1
        } 
      };
    case productConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to item 
      return {
        ...state,
        status: state.items.docs.map(item => {
          if (item._id === action.id) {
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
          createdLoading:true
        }

     case productConstants.CREATE_SUCCESS:
       return{
          createdSuccess: true

       }   

     case productConstants.CREATE_FAILURE:
      return{
        createdSuccess :false
      }  

    default:
      return state
  }
}