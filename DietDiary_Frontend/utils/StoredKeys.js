import AsyncStorage from "@react-native-async-storage/async-storage"

key_account_connect = 'key_account_connect',
key_register_information = 'key_register_information',
key_get_started = 'key_get_started',

module.exports = {
    key_account_connect,
    key_register_information,
    key_get_started,
}

export async function getBoolean(key) {
    try {
        return await AsyncStorage.getItem(key)
    } catch (error) {
        return false;
    }
}

export async function setBoolean(key, value) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        return
    }
}