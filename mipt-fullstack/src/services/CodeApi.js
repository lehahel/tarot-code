import BackApi, {actionTypes} from "./BackApi";

export default {
    CreateCode(user_id, code_name, code) {
        return BackApi.performAction(actionTypes.post, '/code/create', {
            user_id: user_id, name: code_name, code: code
        })
    }
}
