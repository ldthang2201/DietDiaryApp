const moment = require('moment');

export const yyyy_MM_DD = 'yyyy-MM-DD'

export const getDateWithString = () => {
    return moment(new Date()).format(yyyy_MM_DD);
}

export const getDate = (date) => {
    return new Date(date);
}