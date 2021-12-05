import { apiCreateAccount, apiGetCalendars, apiGetInformation, apiLogin, apiSetCalendars, apiSetInformation } from "../utils/ApiUri";

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

export async function getInformation (id) {
    try {
        console.log(apiGetInformation);
        let response = new Promise((resolve, reject) => {
            fetch(`${apiGetInformation}/${id}`, {
                method: GET,
                headers: HEADER,
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

export async function setInformation(id, information) {
    try {
        const param = {
            id: id,
            information: information
        }
        console.log(apiSetInformation);
        let response = new Promise((resolve, reject) => {
            fetch(apiSetInformation, {
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

export async function getCalendars (id) {
    try {
        console.log(apiGetCalendars);
        let response = new Promise((resolve, reject) => {
            fetch(`${apiGetCalendars}/${id}`, {
                method: GET,
                headers: HEADER,
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

export async function setCalendars(id, listCalendars) {
    try {
        const param = {
            id: id,
            listCalendars: listCalendars
        }
        console.log(apiSetCalendars);
        let response = new Promise((resolve, reject) => {
            fetch(apiSetCalendars, {
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
