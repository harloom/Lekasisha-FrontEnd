import { productConstants } from '../_constants';
import { productService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const productActions = {
    createproduct,
    editproduct,
    getAll,
    delete: _delete,
    putPitchure: _putPitchure
};

function createproduct(fromData) {
    return dispatch => { 
        dispatch(request(fromData));

        productService.create(fromData)
            .then(
                product => { 
                    dispatch(success(product));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.CREATE_REQUEST, product } }
    function success(product) { return { type: productConstants.CREATE_SUCCESS, product } }
    function failure(error) { return { type: productConstants.CREATE_FAILURE, error } }
}


function editproduct(id,object) {
    return dispatch => {
        dispatch(request(id));
        /*
	"name" : "Minuman",
	"description" : "Seperti Es ,Just Buah dan dll",
	"backgroundColor":"#48dbfb"

        */
        productService.update(id,object)
            .then(
              product => { 
                    dispatch(success());
                    // history.push('/auth');
                    dispatch(alertActions.success('Edit Data successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(product) { return { type: productConstants.EDIT_REQUEST, product } }
    function success(product) { return { type: productConstants.EDIT_SUCCESS, product } }
    function failure(error) { return { type: productConstants.EDIT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        productService.getAll()
            .then(
              product => dispatch(success(product)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: productConstants.GETALL_REQUEST } }
    function success(product) { return { type: productConstants.GETALL_SUCCESS, product } }
    function failure(error) { return { type: productConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        productService.deleteById(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: productConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: productConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: productConstants.DELETE_FAILURE, id, error } }
}

function _putPitchure(fromData){
    
}