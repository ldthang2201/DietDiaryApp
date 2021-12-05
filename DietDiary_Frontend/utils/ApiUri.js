const DOMAIN = "http://192.168.1.14";
const PORT= 3000;
const REQUEST_URL = `${DOMAIN}:${PORT}`

//Method: POST
const apiCreateAccount = REQUEST_URL.concat('/dietdiary/create');
//Method: POST
const apiLogin = REQUEST_URL.concat('/dietdiary/login');
//Method: GET
const apiGetInformation = REQUEST_URL.concat('/dietdiary/getInformation')
//Method: POST
const apiSetInformation = REQUEST_URL.concat('/dietdiary/setInformation')
//Method: GET
const apiGetCalendars = REQUEST_URL.concat('/dietdiary/getCalendars')
//Method: POST
const apiSetCalendars = REQUEST_URL.concat('/dietdiary/setCalendars')
//Method: GET
const apiGetLogs = REQUEST_URL.concat('/dietdiary/getLogs')
//Method: POST
const apiSetLogs = REQUEST_URL.concat('/dietdiary/setLogs')
//Method: GET
const apiGetReminders = REQUEST_URL.concat('/dietdiary/getReminders')
//Method: POST
const apiSetReminsers = REQUEST_URL.concat('/dietdiary/setReminders')

module.exports = {
    apiCreateAccount,
    apiLogin,
    apiGetInformation,
    apiSetInformation,
    apiGetCalendars,
    apiSetCalendars,
    apiGetLogs,
    apiSetLogs,
    apiGetReminders,
    apiSetReminsers,
}