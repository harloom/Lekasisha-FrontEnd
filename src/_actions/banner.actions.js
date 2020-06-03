import { bannerConstants } from '../_constants';
import { bannerService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';

export const bannerActions = {
    createBanner,
    editBanner ,
    getAll,
    deleteById: deleteById,
    putPitchure: _putPitchure
};

function createBanner(fromData) {
    return dispatch => { 
        dispatch(request(fromData));

        bannerService.create(fromData)
            .then(
                banner => { 
                    dispatch(success(banner));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(banner) { return { type: bannerConstants.CREATE_REQUEST, banner } }
    function success(banner) { return { type: bannerConstants.CREATE_SUCCESS, banner } }
    function failure(error) { return { type: bannerConstants.CREATE_FAILURE, error } }
}


function editBanner(id,object) {
    return dispatch => {
        dispatch(request(id));
        /*
	"name" : "Minuman",
	"description" : "Seperti Es ,Just Buah dan dll",
	"backgroundColor":"#48dbfb"

        */
        bannerService.update(id,object)
            .then(
              response => { 
                    dispatch(success());
                    // console.log(response);
                    dispatch(alertActions.success('Edit Data successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(id) { return { type: bannerConstants.EDIT_REQUEST, id } }
    function success(message) { return { type: bannerConstants.EDIT_SUCCESS, message } }
    function failure(error) { return { type: bannerConstants.EDIT_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        bannerService.getAll()
            .then(
              banners => dispatch(success(banners)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: bannerConstants.GETALL_REQUEST } }
    function success(banners) { return { type: bannerConstants.GETALL_SUCCESS, banners } }
    function failure(error) { return { type: bannerConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function deleteById(id) {
    return dispatch => {
        dispatch(request(id));

        bannerService.deleteById(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: bannerConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: bannerConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: bannerConstants.DELETE_FAILURE, id, error } }
}

function _putPitchure(fromData){
    
}