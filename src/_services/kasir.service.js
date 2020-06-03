
import { authHeader ,getAPI} from '_helpers';

export const  kasirService= {
  getOrdersService,
  getOrderDetailService,
  searchOrderService,
  actionOrderService
}


//get Data Information
const path = "transaction/order/admin"
function getOrdersService(page){
  //page : int
  //pagging infiormation
  let url = new URL(`${getAPI()}/${path}`);
  let params ={
    page:page
  }
  url.search = new URLSearchParams(params).toString();
  const requestOptions ={
    method : 'GET',
    headers:{ ...authHeader()}
  }
  return fetch(url,requestOptions)
  .then(handleResponse)
  .then(data =>{
    return data;
  });

  
}

function getOrderDetailService(idOrder){
  let url = new URL(`${getAPI()}/${path}/detail/${idOrder}`);
  const requestOptions ={
    method : 'GET',
    headers:{ ...authHeader()}
  }
  return fetch(url,requestOptions)
  .then(handleResponse)
  .then(data =>{
    return data;
  });
}


function searchOrderService(text){

}




//businise

function actionOrderService(idOrder ,action ){
  let url = new URL(`${getAPI()}/${path}/${idOrder}/${action}`);
  const requestOptions ={
    method : 'POST',
    headers:{ ...authHeader()}
  }
  return fetch(url,requestOptions)
  .then(handleResponse)
  .then(data =>{
    return data;
  });
}





//laporan function
function cetakOrderService(){

}

function exportDataOrdersService(){

}

//handle response
function handleResponse(response) {
  return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
          if (response.status === 401) {
              // auto logout if 401 response returned from api
              localStorage.removeItem('user');
              window.location.href="/auth"
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
      }

      return data;
  });
}