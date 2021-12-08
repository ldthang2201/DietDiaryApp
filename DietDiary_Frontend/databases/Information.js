import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";
import { EATING_TYPE, EXERCISE_TYPE } from "./Reminder";

export const Information = {
    name: allSchemas.INFORMATION,
    properties: {
        primaryKey: { type: "string", default: new Date().getTime().toString() },
        username: "string?",
        email: "string?",
        fullname: "string?",
        dob: "string?",
        height: "float?",
        eatTime: {type: "int", default: 3},
        exerciseTime: {type: "int", default: 1},
        dateUsingApp: "string?",
        isVerify: { type: "bool", default: false },
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date?",
        isUpdate: { type: "bool", default: false},
        isDelete: { type: "bool", default: false },
    }

};

export const createAccount = newAccount => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false)
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                getOne.username = newAccount.username;
                getOne.email = newAccount.email;
                getOne.primaryKey = newAccount.primaryKey
            } else {
                realm.create(allSchemas.INFORMATION, newAccount);
            }
        })
        resolve();
    }).catch(error => reject(error));
})

export const registerInformation = newInfo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                getOne.fullname = newInfo.fullname;
                getOne.dob = newInfo.dob;
                getOne.height = newInfo.height;
                getOne.isUpdate = true;
                getOne.updateAt = new Date();
            } else {
                realm.create(allSchemas.INFORMATION, newInfo);
            }
        })
        resolve();
    }).catch((error) => reject(error));
});

export const getOne = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
        let result = {};
        if (currentInfo.length > 0) {
            result = currentInfo[0];
        }
        resolve(result);
    }).catch((error) => reject(error));
});

export const logOut = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                getOne.username = null,
                getOne.email = null,
                getOne.updateAt = new Date();
            }
        })
        resolve();
    }).catch((error) => reject(error));
})

export const updateInforTimes = (type, times) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                if (type == EATING_TYPE) {
                    getOne.eatTime = times;
                }
                if (type == EXERCISE_TYPE) {
                    getOne.exerciseTime = times;
                }
                getOne.updateAt = new Date();
                getOne.isUpdate = true;
            }
        })
        resolve();
    }).catch((error) => reject(error));
})

export const mergeInfoToLocal = (information) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                if ((new Date(getOne.updateAt) < new Date(information.updateAt)) || getOne.fullname == null) {
                    getOne.height = information.height;
                    getOne.fullname = information.fullname;
                    getOne.dob = information.dob;
                    getOne.eatTime = information.eatTime;
                    getOne.exerciseTime = information.exerciseTime;
                    getOne.isVerify = information.isVerify;
                    getOne.updateAt = new Date();
                    getOne.isUpdate = true;
                }
                getOne.dateUsingApp = information.dateUsingApp;
            }
        })
        resolve();
    }).catch((error) => reject(error));
})