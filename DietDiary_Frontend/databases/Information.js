import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Information = {
    name:  allSchemas.INFORMATION,
    properties: {
        _id: "int",
        fullname: "string",
        dob: "string",
        height: "float?",
        weight: "float?",
        update_at:  {type: "date", default: new Date()},
        upload_at: "date?",
        delete_flag:  { type: "bool", default: false},
    },
    primaryKey: "_id",
    
};

export const createInformation = newInformation => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(allSchemas.INFORMATION, newInformation);
            resolve(newInformation);
        })
    }).catch((error) => reject(error));
});

export const getOneInformation = () => Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let info = realm.objects(allSchemas.INFORMATION);
    })
})