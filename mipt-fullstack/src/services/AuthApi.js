import BackApi, {actionTypes} from "./BackApi";

import { useCookies } from 'react-cookie';
import {baseUrl} from "../config";

export default {
    RegisterUser(login, email, password, first_name, last_name) {
        return BackApi.performAction(actionTypes.post, '/auth/register/', {
            username: login, email: email, password: password, first_name: first_name, last_name: last_name
        });
    },

    Login(email, password) {
        return BackApi.performAction(actionTypes.post, '/auth/login/', {email: email, password: password});
    },

    GetActiveUser(user_id, access) {
        // return fetch(baseUrl + `/api/user/${user_id}`, { headers: {'Authorization': `Bearer ${access}`} })
        return BackApi.performAction(actionTypes.get, `/user/${user_id}`, {}, {Authorization: `Bearer ${access}`});
    },

    RefreshUser(refresh) {
        return BackApi.performAction(actionTypes.post, '/auth/refresh/', {refresh: refresh});
    }
}
