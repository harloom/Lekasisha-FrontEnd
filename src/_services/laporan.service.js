// import config from 'config';

import { authHeader ,getAPI} from '_helpers';
// const getAPI() = "https://lakeishaapp.herokuapp.com";
import { saveAs } from 'file-saver';


export const laporanService = {
    exportOrder,
    exportUser
};

function exportOrder(start ,end) {
    // console.log(getAPI());
    let url = new URL(`${getAPI()}/report/order`);
    let params ={
        start:start,
        end : end
    }
    url.search = new URLSearchParams(params).toString();
    const requestOptions = {
        method: 'GET',
        headers:{ ...authHeader()},
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(data => {
            // console.log(a);
            return data;
        });
}


function exportUser(page ,limit) {
    // console.log(getAPI());
    let url = new URL(`${getAPI()}/report/client`);
    let params ={
        page:page,
        limit: limit
    }
    url.search = new URLSearchParams(params).toString();
    const requestOptions = {
        method: 'GET',
        headers:{ ...authHeader()},
    };

    return fetch(url, requestOptions)
        .then(handleResponse)
        .then(data => {

            return data;
        });
}



function handleResponse(response) {
    return response.blob().then(data => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                localStorage.removeItem('user');
                window.location.href="/auth"
                window.location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}