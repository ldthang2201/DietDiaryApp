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

module.exports = {
    apiCreateAccount,
    apiLogin,
    apiGetInformation,
    apiSetInformation,
}