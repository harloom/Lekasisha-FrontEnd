import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        ...state  ,
        type: 'alert-success',
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        ...state  ,
        type: 'alert-danger',
        message: action.message
      };
    case alertConstants.CLEAR:
      return {
        ...state  
      };
    case alertConstants.PUT_TOKEN_FCM_SUCCESS:{
      return {...state,putToken : true}
    }

    case alertConstants.PUT_TOKEN_FCM_FAILURE:{
      return {...state,putToken : false}
    }
    
      case alertConstants.GET_INBOX_REQUEST :  
      return{
          loading :true
      };

    case alertConstants.GET_INBOX_SUCCESS  :
      return{
        items : action.inbox
      }
    case alertConstants.GET_INBOX_FAILURE  :
      return {
          ...state   
      }

    default:
      return state
  }
}