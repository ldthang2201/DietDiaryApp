import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Information = {
    name: allSchemas.INFORMATION,
    properties: {
        _id: {type: "string", default: new Date().getTime().toString()},
        username: "string?",
        email: "string?",
        fullname: "string?",
        dob: "string?",
        height: "float?",
        isVerify: { type: "bool", default: false },
        update_at: { type: "date", default: new Date() },
        upload_at: "date?",
        delete_flag: { type: "bool", default: false },
    },
    primaryKey: "_id",

};

export const createAccount = newAccount => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.delete_flag == false)
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                getOne.username = newAccount.username;
                getOne.email = newAccount.email;
            } else {
                realm.create(allSchemas.INFORMATION, newAccount);
            }
        })
        resolve();
    }).catch(error => reject(error));
})

export const registerInformation = newInfo => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.delete_flag == false)
        realm.write(() => {
            if (currentInfo.length > 0) {
                let getOne = currentInfo[0];
                getOne.fullname = newInfo.fullname;
                getOne.dob = newInfo.dob;
                getOne.height = newInfo.height;
            } else {
                realm.create(allSchemas.INFORMATION, newInfo);
            }
        })
        resolve();
    }).catch((error) => reject(error));
});

export const getOneInformation = () => Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let info = realm.objects(allSchemas.INFORMATION);
    })
})