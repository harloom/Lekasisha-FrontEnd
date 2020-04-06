import { categoryConstants } from '../_constants';
import { categoryService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const categoryActions = {
    createCategory,
    editCategory ,
    getAll,
    deleteById: deleteById,
    putPitchure: _putPitchure
};

function createCategory(fromData) {
    return dispatch => { 
        dispatch(request(fromData));

        categoryService.create(fromData)
            .then(
                category => { 
                    dispatch(success(category));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(category) { return { type: categoryConstants.CREATE_REQUEST, category } }
    function success(category) { return { type: categoryConstants.CREATE_SUCCESS, category } }
    function failure(error) { return { type: categoryConstants.CREATE_FAILURE, error } }
}


function editCategory(id,object) {
    return dispatch => {
        dispatch(request(id));
        /*
	"name" : "Minuman",
	"description" : "Seperti Es ,Just Buah dan dll",
	"backgroundColor":"#48dbfb"

        */
        categoryService.update(id,object)
            .then(
              response => { 
                    dispatch(success());
                    console.log(response);
                    dispatch(alertActions.success('Edit Data successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: categoryConstants.EDIT_REQUEST, id } }
    function success(message) { return { type: categoryConstants.EDIT_SUCCESS, message } }
    function failure(error) { return { type: categoryConstants.EDIT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        categoryService.getAll()
            .then(
              categorys => dispatch(success(categorys)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: categoryConstants.GETALL_REQUEST } }
    function success(categorys) { return { type: categoryConstants.GETALL_SUCCESS, categorys } }
    function failure(error) { return { type: categoryConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteById(id) {
    return dispatch => {
        dispatch(request(id));

        categoryService.deleteById(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: categoryConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: categoryConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: categoryConstants.DELETE_FAILURE, id, error } }
}

function _putPitchure(fromData){
    
}