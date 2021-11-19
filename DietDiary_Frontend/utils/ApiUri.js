const DOMAIN = "http://192.168.1.11";
const PORT= 3000;
const REQUEST_URL = `${DOMAIN}:${PORT}`

//Method: POST
const apiCreateAccount = REQUEST_URL.concat('/account/create');
//Method: GET
const apiLogin = REQUEST_URL.concat('/account/login');

module.exports = {
    apiCreateAccount,
    apiLogin,
}