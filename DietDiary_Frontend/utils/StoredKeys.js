import AsyncStorage from "@react-native-async-storage/async-storage"

export const StoredKeysUtls = {
    key_account_connect: 'key_account_connect',
    key_register_information: 'key_register_information',
    key_get_started: 'key_get_started',
    key_date_using_app: 'key_date_using_app',
    key_eating_times: 'key_eating_times',
    key_do_exercise_times: 'key_do_exercise_time',
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
    },
    getString: async (key) => {
        try {
            const result = await AsyncStorage.getItem(key);
            if (result == null) {
                return "";
            }
            return result;
        } catch (error) {
            return "";
        }
    },
    setString: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    },
    getNumber: async (key) => {
        try {
            const result = await AsyncStorage.getItem(key);
            if (result == null) {
                return "-1";
            }
            return result
        } catch (error) {
            return "-1";
        }
    }, 
    setNumber: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, String(value));
        } catch (error) {
            return false;
        }
    },
}