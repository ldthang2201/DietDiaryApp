const moment = require('moment');

export const yyyy_MM_DD = 'yyyy-MM-DD'

/**
 * Get now with format yyyy_MM_DD
 * @returns 
 */
export const getDateWithString = () => {
    return moment(new Date()).format(yyyy_MM_DD);
}

/**
 * Get Date() with param
 * @param {*} date (string with fromat, long)
 * @returns 
 */
export const getDate = (date) => {
    return new Date(date);
}

export const calculateDaysFromNow = (date) => {
    const today = moment(new Date()).startOf('day');
    const calDate = moment(date, yyyy_MM_DD);
    return today.diff(calDate, 'days');
}

/**
 * get display time with format hh:mm
 * 
 * @param {int} date 
 */
export const getDisplayTime = (date) => {
    const tempDate = new Date(date);
    return ("0" + tempDate.getHours()).slice(-2) + ':' + ("0" + tempDate.getMinutes()).slice(-2);
}

/**
 * Get previous date 
 * @param {"yyyy_MM_DD"} date 
 * @returns "yyyy_MM_DD"
 */
export const getPreviousDate = (date) => {
    return moment(date, yyyy_MM_DD).subtract(1, 'days').format(yyyy_MM_DD);
}

/**
 * Get next date 
 * @param {"yyyy_MM_DD"} date 
 * @returns "yyyy_MM_DD"
 */
 export const getNextDate = (date) => {
    return moment(date, yyyy_MM_DD).add(1, 'days').format(yyyy_MM_DD);
}