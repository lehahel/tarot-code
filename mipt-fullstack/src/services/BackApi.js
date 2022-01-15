import axios from 'axios';
import {baseUrl} from '../config'

export const actionTypes = {
    get: 'GET',
    post: 'POST',
    put: "PUT",
    patch: 'PATCH',
    delete: 'DELETE'
}

const getApiUrl = (additionalUrl) => baseUrl + '/api' + additionalUrl;

export default {
    performAction(action, url, data = {}, headers = {}, withCredentials = false) {
        return axios({
            method: action,
            url: getApiUrl(url),
            data: data,
            headers: headers,
            withCredentials: withCredentials
        })
    }
}
