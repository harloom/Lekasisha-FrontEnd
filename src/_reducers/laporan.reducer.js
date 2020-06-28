import { laporanConstants } from '../_constants';


export function laporan(state = {}, action) {

  switch (action.type) {
    case laporanConstants.EXPORT_ORDER_REQUEST:
      return { exportOrderRequest: true };
    case laporanConstants.EXPORT_ORDER_SUCCESS:
      return {exportOrderSuccess : true};
    case laporanConstants.EXPORT_ORDER_FAILURE:
      return { exportOrderFailur : true ,msg : action.error};



      case laporanConstants.EXPORT_USER_REQUEST:
        return { 
          exportUserRequest: true };
      case laporanConstants.EXPORT_USER_SUCCESS:
        return { exportUserSuccess : true};
      case laporanConstants.EXPORT_USER_FAILURE:
        return { exportUserFailur :true ,msg : action.error};  
    default:
      return state
  }
}