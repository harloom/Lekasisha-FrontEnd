import { alertConstants } from '../_constants';
import { informationService } from '../_services';
export const alertActions = {
    success,
    error,
    clear,
    getNotification,
    putToken,
};
function putToken(token){
    return dispatch => { 
        dispatch(request(token));

        informationService.putTokenService(token)
            .then(
                respon => { 
                    dispatch(success(respon));
                    // history.push('/');
                },
                respon => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(respon) { return { type: alertConstants.PUT_TOKEN_FCM_REQUEST, respon } }
    function success(respon) { return { type: alertConstants.PUT_TOKEN_FCM_SUCCESS, respon } }
    function failure(error) { return { type: alertConstants.PUT_TOKEN_FCM_FAILURE, error } }

}
function getNotification(page){
    return dispatch => { 
        dispatch(request(page));

        informationService.getInboxs(page)
            .then(
                inbox => { 
                    dispatch(success(inbox));
                    // history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(inbox) { return { type: alertConstants.GET_INBOX_REQUEST, inbox } }
    function success(inbox) { return { type: alertConstants.GET_INBOX_SUCCESS, inbox } }
    function failure(error) { return { type: alertConstants.GET_INBOX_FAILURE, error } }

}

function success(message) {
    return { type: alertConstants.SUCCESS, message };
}

function error(message) {
    return { type: alertConstants.ERROR, message };
}

function clear() {
    return { type: alertConstants.CLEAR };
}