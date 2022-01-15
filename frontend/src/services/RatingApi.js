import BackApi, {actionTypes} from "./BackApi";

export default {
    GetTopCodes(number) {
        // eslint-disable-next-line no-template-curly-in-string
        return BackApi.performAction(actionTypes.get, `/top_codes/?limit=${number}`)
    }
}