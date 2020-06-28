
import {kasirService} from '../_services/kasir.service';
import {kasirConstans} from '../_constants/kasir.constans';
export const  kasirActions ={
  getOrders,
  detailOrder,
  acceptOrder,
  ongoingOrder,
  denyOrder,
  cancelOrder,
  finishOrder,
  paymentOrder,
}




function getOrders(page) {
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.getOrdersService(page)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_DATA_REQUEST,message
    }
  }
  function success(orders) {
    return {
      type : kasirConstans.ORDER_DATA_SUCCESS,orders
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_DATA_FAILURE , error
    }
  }
}

const actionOrderKey = {
  accept: "accept",
  complate: "complate",
  ongoing : "ongoing",
  cancel  : "cancel",
  deny : "deny",
  pay : "pay"
}

function paymentOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.pay)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_ACCEPT_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_ACCEPT_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_ACCEPT_FAILURE , error
    }
  }
}
function acceptOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.accept)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_ACCEPT_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_ACCEPT_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_ACCEPT_FAILURE , error
    }
  }
}

function ongoingOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.ongoing)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_ONGOING_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_ONGOING_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_ONGOING_FAILURE , error
    }
  }
}

function denyOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.deny)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_DENY_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_DENY_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_DENY_FAILURE , error
    }
  }
}


function cancelOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.cancel)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_CANCEL_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_CANCEL_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_CANCEL_FAILURE , error
    }
  }
}

function finishOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.actionOrderService(idOrder,actionOrderKey.complate)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_FINISH_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_FINISH_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_FINISH_FAILURE , error
    }
  }
}

function detailOrder(idOrder){
  return dispatch=>{
    dispatch(request("ON REQUEST.."));
    kasirService.getOrderDetailService(idOrder)
    .then(
      data=>{
        dispatch(success(data));
      },
      error=>{
        dispatch(failure(error.toString()));
      }
    )
  }

  function request(message){
    return{
      type: kasirConstans.ORDER_DATA_DETAIL_REQUEST,message
    }
  }
  function success(order) {
    return {
      type : kasirConstans.ORDER_DATA_DETAIL_SUCCESS,order
    }

  }
  function failure(error){
    return {
      type :kasirConstans.ORDER_DATA_DETAIL_FAILURE , error
    }
  }
}

function cetakOrder(data){
  
}

function cetakOrderPerPage(page){

}


