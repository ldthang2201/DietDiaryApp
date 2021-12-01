import AsyncStorage from "@react-native-async-storage/async-storage"

export const StoredKeysUtls = {
    key_account_connect: 'key_account_connect',
    key_register_information: 'key_register_information',
    key_get_started: 'key_get_started',
    getBoolean: async (key) => {
        try {
            return await AsyncStorage.getItem(key);
        } catch (error) {
            return false;
        }
    },
    setBoolean: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    }
}