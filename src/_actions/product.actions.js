import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    createproduct,
    editproduct,
    getAll,
    getInformation :_information,
    deleteById: _delete,
    putPitchure: _putPitchure
};

function _information(){
    return dispatch =>{
        dispatch(request("request"));

        productService.infomation()
        .then(
            data=>{ 
                dispatch(success(data))
            },
            error=>{
                dispatch(failure(error.toString()));
            }
        )
    }
    function request(message) { return { type: productConstants.INFORMATION_REQUEST, message } }
    function success(information) { return { type: productConstants.INFORMATION_SUCCESS, information } }
    function failure(error) { return { type: productConstants.INFORMATION_FAILURE, error } }
}

function createproduct(fromData) {
    return dispatch => { 
        dispatch(request(fromData));

        productService.create(fromData)
            .then(
                products => { 
                    dispatch(success(products));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(products) { return { type: productConstants.CREATE_REQUEST, products } }
    function success(products) { return { type: productConstants.CREATE_SUCCESS, products } }
    function failure(error) { return { type: productConstants.CREATE_FAILURE, error } }
}


function editproduct(id,object) {
    return dispatch => {
        dispatch(request(object));
        productService.update(id,object)
            .then(
              editProduct => { 
                    dispatch(success(editProduct));
                },
                error => {
                    dispatch(failure(error.toString()));
                    
                }
            );
    };

    function request(editProduct) { return { type: productConstants.EDIT_REQUEST, editProduct } }
    function success(editProduct) { return { type: productConstants.EDIT_SUCCESS, editProduct } }
    function failure(error) { return { type: productConstants.EDIT_FAILURE, error } }
}

function getAll(idCategory,page) {
    return dispatch => {
        dispatch(request(idCategory));
        // console.log(idCategory);
        // console.log(page);
        productService.getAllPage(idCategory,page)
            .then(
                products => dispatch(success(products)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request(idCategory) { return { type: productConstants.GETALL_REQUEST ,idCategory} }
    function success(products) { return { type: productConstants.GETALL_SUCCESS, products } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));
        // console.log(`deleted ${id}`)
        productService.deleteById(id)
            .then(
                response => {
                    // console.log("response");
                    dispatch(success(id));
                },
              
                error => {
                    // console.log("error");
                    dispatch(failure(id, error.toString()))}
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}

function _putPitchure(fromData){
    
}