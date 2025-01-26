
import { DateTime } from 'luxon';

export let _dateUtils = {
    //gettimestamp millisant

    getTimestamp: () => {
        return Date.now().toString();
    },

    //getTimestamp covet normal date fun

    timestampToDate: (timestamp: number) => {
        return DateTime.fromSeconds(timestamp).toISO();
    }


}