

export let _utils = {

    isParseInt: (value: any): number => {
        // if (typeof value === "number") {
        //     return parseInt(_utils.trim(value))
        // }
        return parseInt(value)


    },

    parseBooleam: (boolValue: any) => {
        if (!boolValue) {
            return false
        }

        boolValue = (boolValue + "").trim()
        return (boolValue == 'true')
    },

    trim: (value: string): string => {

        value = value || ""
        value = value + ""
        return value.trim()

    },

    isEmptyStrict: (input: any) => {
        input = _utils.trim(input)
        return _utils.isEmpty(input)
    },

    isEmpty: (input: any) => {
        if (!input) {
            return true
        }

        if (Array.isArray(input)) {
            return input.length === 0
        }


        return (Object.keys(input).length === 0 && input.constructor === Object)
    },
}
