import { apiCreateAccount, apiLogin } from "../utils/ApiUri";

const HEADER = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
const POST = 'POST';
const GET = 'GET';
export async function CreateAccount(username, email, password) {
    try {
        const param = {
            username: username,
            email: email,
            password: password
        }
        console.log(apiCreateAccount);
        let response = new Promise((resolve, reject) => {
            fetch(apiCreateAccount, {
                method: POST,
                headers: HEADER,
                body: JSON.stringify(param)
            }).then((result) => resolve(result.json())).catch((error) => reject(error));
            setTimeout(() => {
                reject({
                    result: 'Fail',
                    message: 'Network request failed, please try later!'
                })
            }, 10000)
        })
        let result = await response;
        return result;
    } catch (error) {
        return error;
    }
}

export async function Login(username, password) {
    try {
        const param = {
            username: username,
            password: password
        }
        console.log(apiLogin);
        let response = new Promise((resolve, reject) => {
            fetch(apiLogin, {
                method: POST,
                headers: HEADER,
                body: JSON.stringify(param)
            }).then((result) => resolve(result.json())).catch((error) => reject(error));
            setTimeout(() => {
                reject({
                    result: 'Fail',
                    message: 'Network request failed, please try later!'
                })
            }, 10000)
        })
        let result = await response;
        return result;
    } catch (error) {
        return error;
    }
}
