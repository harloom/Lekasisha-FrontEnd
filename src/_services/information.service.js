import { authHeader ,getAPI} from '_helpers';


export const  informationService= {
  getInboxs,
  putTokenService
}

const path = "member"
function getInboxs(page){
  //page : int
  
  //pagging infiormation
  let url = new URL(`${getAPI()}/${path}/notification`);
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

function putTokenService(token){
  let url = new URL(`${getAPI()}/${path}/fcm/web`);
  // let params ={
  //   page:page
  // }
  // url.search = new URLSearchParams(params).toString();
  const requestOptions ={
    method : 'POST',
    headers:{ ...authHeader(),'Content-Type': 'application/json'},
    body: JSON.stringify({ token:token})
  }
  return fetch(url,requestOptions)
  .then(handleResponse)
  .then(data =>{
    return data;
  });
}

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



