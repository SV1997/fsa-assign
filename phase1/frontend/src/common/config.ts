const baseURL = import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';

export default {
    SUCCESS_CODE: 200,
    auth:{
        DASHBOARD_URL:`${baseURL}/equipment/getallequipment`,
        CREATE_REQUEST_URL:`${baseURL}/requests/createrequest`,
        GET_REQUEST_BY_ID_URL:`${baseURL}/requests/getrequestbyid`,
        DELETE_REQUEST_URL:`${baseURL}/requests/delete-request`,
        GET_ALL_REQUESTS_URL:`${baseURL}/requests/getRequests`,
        APPROVE_REQUEST_URL:`${baseURL}/requests/approverequest`,
        REJECT_REQUEST_URL:`${baseURL}/requests/rejectrequest`,
        GET_ALL_LOANS_URL:`${baseURL}/loans/getloans`,
        POST_CREATE_LOAN_URL:`${baseURL}/loans/createloan`,
        ADD_EQUIPMENT_URL:`${baseURL}/equipment/addequipment`,
        PUT_UPDATE_EQUIPMENT_URL:`${baseURL}/equipment/updateequipment`,
        PUT_DELETE_EQUIPMENT_URL:`${baseURL}/equipment/deleteequipment`,
        PUT_RETURN_LOAN_URL:`${baseURL}/loans/returnloan`,
        GET_ALL_USERS_URL:`${baseURL}/users/getallusers`,
        PUT_UPDATE_USER_URL:`${baseURL}/users/updateuser`,
        DELETE_USER_URL:`${baseURL}/users/delete-user`,
        GET_AVAILABLE_EQUIPMENT_COUNT_URL:`${baseURL}/equipment/available-count`,
        GET_NUMBER_OF_PENDING_REQUESTS_URL:`${baseURL}/requests/number-of-pending-requests`,
        GET_NUMBER_OF_PENDING_LOANS_URL:`${baseURL}/loans/number-of-pending-loans`,
    },
    equipment:{
        GET_ALL_EQUIPMENT_URL:`${baseURL}/equipment/getallequipment`,
        GET_ALL_EQUIPMENT_CATEGORIES_URL:`${baseURL}/equipment/getcategories`
    }
}