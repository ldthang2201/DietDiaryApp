import { apiCreateAccount } from "../utils/ApiUri";

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
        let response = await fetch(apiCreateAccount, {
            method: POST,
            headers: HEADER,
            body: JSON.stringify(param)
        });
        let result = await response.json();
        return result;
    } catch (error) {
        return error;
    }
}

export async function TestApi() {
    try {
        let response = await fetch("http://192.168.1.26:3000/", {
            method: 'GET',

        });
        console.log(`response is ${response.json}`);
    } catch (error) {
        console.log(`erroe is ${error}`);
    }
}