import BackApi, {actionTypes} from "./BackApi";

export default {
    RegisterUser(login, email, password, first_name, last_name) {
        return BackApi.performAction(actionTypes.post, '/auth/register/', {
            username: login, email: email, password: password, first_name: first_name, last_name: last_name
        });
    },

    Login(email, password) {
        return BackApi.performAction(actionTypes.post, '/auth/login/', {email: email, password: password});
    }
}
