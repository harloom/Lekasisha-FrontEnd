import {
  kasirConstans
} from '../_constants'

export function orders(state = {}, action) {

  switch (action.type) {

    case kasirConstans.ORDER_DATA_REQUEST:
      return {
        loading:true
      }
    case kasirConstans.ORDER_DATA_SUCCESS:
      return {
        items : action.orders
      }

    case kasirConstans.ORDER_DATA_FAILURE:
      return{
        error: action.error
      }

    // detail
    case kasirConstans.ORDER_DATA_DETAIL_REQUEST:
      return {
          ...state,
          loadingDetail:true
        
      }
    case kasirConstans.ORDER_DATA_DETAIL_SUCCESS:
      return {
        ...state,
          loadingDetail:false,
          orderDetail : action.order
    }    

    case kasirConstans.ORDER_DATA_DETAIL_FAILURE:
      return{
        ...state,
          loadingDetail:false
      }

    //accept

    case kasirConstans.ORDER_ACCEPT_REQUEST:
      return {
        ...state,
        loadingAction:true
      }
    case kasirConstans.ORDER_ACCEPT_SUCCESS:
      return {
        ...state,
        loadingAction:false
      }

    case kasirConstans.ORDER_ACCEPT_FAILURE:
      return{
        ...state,
        loadingAction:false
      }

    //ongoing
    case kasirConstans.ORDER_ONGOING_REQUEST:
      return {
        ...state,
        loadingAction:true
      }
    case kasirConstans.ORDER_ONGOING_SUCCESS:
      return {
        ...state,
        loadingAction:false
      }

    case kasirConstans.ORDER_ONGOING_FAILURE:
      return{
        ...state,
        loadingAction:false
      }

      //cancel
    case kasirConstans.ORDER_CANCEL_REQUEST:
    return {
      ...state,
      loadingAction:true
    }
    case kasirConstans.ORDER_CANCEL_SUCCESS:
    return {
      ...state,
      loadingAction:false
    }

    case kasirConstans.ORDER_CANCEL_FAILURE:
    return{
      ...state,
      loadingAction:false
    }

    
    case kasirConstans.ORDER_DENY_REQUEST:
      return {
        ...state,
        loadingAction:true
      }
    case kasirConstans.ORDER_DENY_SUCCESS:
      return {
        ...state,
        loadingAction:false
      }

    case kasirConstans.ORDER_DENY_FAILURE:
      return{
        ...state,
        loadingAction:false
      }

    // finish

    case kasirConstans.ORDER_FINISH_REQUEST:
      return {
        ...state,
        loadingAction:true
      }
    case kasirConstans.ORDER_FINISH_SUCCESS:
      return {
        ...state,
        loadingAction:false
      }

    case kasirConstans.ORDER_FINISH_FAILURE:
      return{
        ...state,
        loadingAction:false
      }

    //cetak
    case kasirConstans.ORDER_CETAK_REQUEST:
      return {
        ...state,
        loadingAction:true
      }
    case kasirConstans.ORDER_CETAK_SUCCESS:
      return {

      }

    case kasirConstans.ORDER_CETAK_FAILURE:
      return{

      }

    default:
      return state

  }

}