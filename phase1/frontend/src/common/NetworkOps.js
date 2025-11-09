import axios from "axios";
const baseURL= import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api';
import config from "./config";

const authRoutes=[
  config.auth.DASHBOARD_URL,
  config.auth.CREATE_REQUEST_URL,
  config.auth.GET_REQUEST_BY_ID_URL,
  config.auth.DELETE_REQUEST_URL,
  config.auth.GET_ALL_REQUESTS_URL,
  config.auth.APPROVE_REQUEST_URL,
  config.auth.REJECT_REQUEST_URL,
  config.auth.GET_ALL_LOANS_URL,
  config.auth.POST_CREATE_LOAN_URL,
  config.auth.ADD_EQUIPMENT_URL,
  config.auth.PUT_UPDATE_EQUIPMENT_URL,
  config.auth.PUT_DELETE_EQUIPMENT_URL,
  config.auth.PUT_RETURN_LOAN_URL,
  config.auth.GET_ALL_USERS_URL,
  config.auth.PUT_UPDATE_USER_URL,
  config.auth.DELETE_USER_URL,
    config.auth.GET_AVAILABLE_EQUIPMENT_COUNT_URL,
  config.auth.GET_NUMBER_OF_PENDING_REQUESTS_URL,
  config.auth.GET_NUMBER_OF_PENDING_LOANS_URL,
  config.equipment.GET_ALL_EQUIPMENT_URL,
  config.equipment.GET_ALL_EQUIPMENT_CATEGORIES_URL,
]
axios.interceptors.request.use(
  (config) => {
    let newConfig = config;
    const accessToken = sessionStorage.getItem("accessToken");
    
    try {
      const isTokenRequired = authRoutes.includes(config.url.split("?")[0]||"");
      console.log ('isTokenRequired',isTokenRequired&&!!accessToken);

      if (isTokenRequired && !!accessToken) {
        newConfig={
            ...newConfig,
            headers:{
                ...newConfig.headers,
                Authorization:`Bearer ${accessToken}`
            },
            timeout:5000
        }
      }
      else{
        newConfig={
            ...newConfig,
            headers:{
              ...newConfig.headers
            },
            timeout:5000
        }
      }
    } catch (error) {
        console.log(error);
        
    }

    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    (response) => {
        try {
            if(response.status === 200){
                return response.data
            }
            else{
                console.log('response error in network ops');
                return Promise.reject(new Error('Network response was not ok'));
            }

        } catch (error) {
            console.log('error in response interceptor',error);
            
        }
        return{
            success:false,
            message:'Unknown error occurred'
        }
    },
    (error) => {
        if(error.response){
            console.log('Error Response:',error.response.data);
            return Promise.reject(error.response.data);
        }
        else if(error.request){
            console.log('Error Request:',error.request);
            return Promise.reject(new Error('No response received from server'));
        }
        else{
            console.log('Error Message:',error.message);
            return Promise.reject(new Error(error.message));
        }
    }
)

export const fetchRequestGet = async (url) => {
  try {
    const response = await axios.get(baseURL + url, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials in the request
    });
    console.log("Response from GET request:", response);

    return response;
  } catch (error) {
    console.error("Error in GET request:", error);
    return Promise.reject(error);
  }
};
export const fetchRequesPost = async (url, payload = {}) => {
  try {
    const response = await axios.post(baseURL + url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials in the request
    });
    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    return Promise.reject(error);
  }
};
export const fetchRequesPut = async (url, payload = {}) => {
  try {
    const response = await axios.put(baseURL + url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, // Include credentials in the request
    });
    console.log("Response from PUT request:", response);

    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    return Promise.reject(error);
  }
};
export const fetchRequesDelete = async (url, payload = {}) => {
  try {
    console.log(payload);
    
    const response = await axios.delete(baseURL + url, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true, 
    });
    return response;
  } catch (error) {
    console.error("Error in POST request:", error);
    return Promise.reject(error);
  }
};
