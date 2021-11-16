const domain = "http://192.168.1.26:3000";

//Method: POST
const apiCreateAccount = domain.concat('/account/create');
//Method: GET
const apiLogin = domain.concat('/account/login');

module.exports = {
    apiCreateAccount,
    apiLogin,
}