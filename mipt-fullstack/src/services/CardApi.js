import BackApi, {actionTypes} from "./BackApi";

export default {
    getCardInfo(id) {
        // eslint-disable-next-line no-template-curly-in-string
        return BackApi.performAction(actionTypes.get, `get_card/${id}/`)
    }
}