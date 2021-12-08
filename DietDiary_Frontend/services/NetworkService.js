import { apiCreateAccount, apiGetCalendars, apiGetInformation, apiGetLogs, apiGetReminders, apiLogin, apiSetCalendars, apiSetInformation, apiSetLogs, apiSetReminsers } from "../utils/ApiUri";

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

export async function getLogs (id) {
    try {
        console.log(apiGetLogs);
        let response = new Promise((resolve, reject) => {
            fetch(`${apiGetLogs}/${id}`, {
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

export async function setLogs(id, listLogs) {
    try {
        const param = {
            id: id,
            listLogs: listLogs
        }
        console.log(apiSetLogs);
        let response = new Promise((resolve, reject) => {
            fetch(apiSetLogs, {
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

export async function getReminders (id) {
    try {
        console.log(apiGetReminders);
        let response = new Promise((resolve, reject) => {
            fetch(`${apiGetReminders}/${id}`, {
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

export async function setReminders(id, listReminders) {
    try {
        const param = {
            id: id,
            listReminders: listReminders
        }
        console.log(apiSetReminsers);
        let response = new Promise((resolve, reject) => {
            fetch(apiSetReminsers, {
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
