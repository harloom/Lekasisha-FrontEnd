import { laporanConstants } from '../_constants';
import { laporanService } from '../_services';
import { alertActions } from '.';
import { history } from '../_helpers';
import { saveAs } from 'file-saver';
export const laporanActions = {
    exportOrder,
    exportUser
};

function exportOrder(startDate ,endDate) {
    return dispatch => {
        dispatch(request({startDate,endDate}));

        laporanService.exportOrder(startDate,endDate)
            .then(
                data => { 
                    const xlsBlob = new Blob([data], {   type: "application/vnd.ms-excel;charset=utf-8" });
                    const fileName = `order-${Date.now()}.xlsx`;
                    saveAs(xlsBlob,fileName );
                    dispatch(success(fileName));
                },
                error => {
                    dispatch(failure(error.toString()));

                }
            );
    };

    function request(page) { return { type: laporanConstants.EXPORT_ORDER_REQUEST, page } }
    function success(data) { return { type: laporanConstants.EXPORT_ORDER_SUCCESS, data } }
    function failure(error) { return { type: laporanConstants.EXPORT_ORDER_FAILURE, error } }
}
function exportUser(page ,limit) {
    return dispatch => {
        dispatch(request(page));

        laporanService.exportUser(page , limit)
            .then(
                data => { 
                    const xlsBlob = new Blob([data], {   type: "application/vnd.ms-excel;charset=utf-8" });
                    
                    const fileName = `user-${Date.now().toString()}.xlsx`;
                    saveAs(xlsBlob,fileName );
                    dispatch(success(fileName));
        
                },
                error => {
                    dispatch(failure(error.toString()));
        
                }
            );
    
    };

    function request(page) { return { type: laporanConstants.EXPORT_USER_REQUEST, page } }
    function success(data) { return { type: laporanConstants.EXPORT_USER_SUCCESS, data } }
    function failure(error) { return { type: laporanConstants.EXPORT_USER_FAILURE, error } }
}

