import { useContext } from 'react'
import jwt_decode from "jwt-decode";
import axios from 'axios'
import dayjs from 'dayjs'
import { AuthContext } from 'context/authContext';
import { decryptData } from 'utils';

export const BASE_URL = 'http://localhost:5000'

const useAxios = () => {

    const { state, dispatch } = useContext(AuthContext)

    const axiosInstance = axios.create({
        baseURL: BASE_URL,
        headers:{Authorization: `Bearer ${state?.access_token}`}
    });

    axiosInstance.interceptors.request.use(async(req) => {
        const user = jwt_decode(state.access_token)
        const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
        if (!isExpired) return req
        const userData = decryptData('user')
        const payload = {
            userId: userData.user.userSlug
        }
        const { data } = await axios.post(`${BASE_URL}/api/refresh_token`, payload);
        dispatch({
            type: 'LOG_IN_USER',
            payload: data
        })
        req.headers.Authorization = `Bearer ${data.access_token}`
        return req
    })

    const responseHandler = response => {
        if (response.status === 401) {
            window.location = '/login';
        }
    
        return response;
    }
    
    const errorHandler = error => {
        return Promise.reject(error);
    }

    axiosInstance.interceptors.response.use(
        (response) => responseHandler(response),
        (error) => errorHandler(error)
    );
    
  return axiosInstance
}

export default useAxios