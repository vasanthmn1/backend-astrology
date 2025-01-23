import _config from "../../config/config"

let _logUtils = {

    log(message: any,) {
        if (!_config.flag.live) {
            console.log(message,);
        }
    },

    table(message: any,) {
        if (!_config.flag.live) {
            console.table(message,);
        }
    },
    logJsonStringify(message: any,) {
        if (!_config.flag.live) {
            console.log(JSON.stringify(message));
        }
    },

    logJsonParse(message: any,) {
        if (!_config.flag.live) {
            console.log(JSON.parse(message));
        }
    }

}

export default _logUtils