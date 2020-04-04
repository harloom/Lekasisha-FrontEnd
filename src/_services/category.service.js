// import config from 'config';
import { authHeader ,getAPI} from '_helpers';

// const global = "https://lakeishaapp.herokuapp.com";



export const categoryService = {
  create,
  update,
  deleteById,
  getAll
};

function create(fromData ){
  //passing from Data
  /*
  image:
  name
  description
  backgroundColor
  */
  console.log(fromData);
  const requestOptions ={ 
    method: 'POST',
        headers:{ ...authHeader()},
        body: fromData
  }
  return fetch(`${getAPI()}/category/new`,requestOptions)
  .then(handleResponse)
  .then(data=>{
    return data
  }).catch(err=>{

  });
}

function update(id,object){
  console.log(object);
          /*
	"name" : "Minuman",
	"description" : "Seperti Es ,Just Buah dan dll",
	"backgroundColor":"#48dbfb"

        */
  const requestOptions ={ 
    method: 'PATCH',
        headers:{ ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(object)
  }
  return fetch(`${getAPI()}/category/${id}/edit`,requestOptions)
  .then(handleResponse)
  .then(data=>{
    return data
  }).catch(err=>{

  });
}

function deleteById(id){
  // console.log(object);
  const requestOptions ={ 
    method: 'DELETE',
        headers:{ ...authHeader(), 'Content-Type': 'application/json' },
        body: {}
  }
  return fetch(`${getAPI()}/category/${id}`,requestOptions)
  .then(handleResponse)
  .then(data=>{
    return data
  }).catch(err=>{

  });
}

function getAll(){
  // console.log(object);
  const requestOptions ={ 
    method: 'GET',
        headers:{ ...authHeader(), 'Content-Type': 'application/json' },
  }
  // product?category=5e47c8d223645f0023d6ed35&limit=10&page=1&sortWith=price&sort=asc
  return fetch(`${getAPI()}/category`,requestOptions)
  .then(handleResponse)
  .then(data=>{
    return data
  }).catch(err=>{

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