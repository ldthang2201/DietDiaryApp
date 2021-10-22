import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Log = {
    name: allSchemas.LOG,
    properties: {
        _id: "int",
        date: "string",
        time: "string",
        type: "string",
        update_at:  {type: "date", default: new Date()},
        upload_at: "date?",
        delete_flag:  { type: "bool", default: false},
    },
    primaryKey: "_id",
}

export const createNewLog = newLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        // const allLog = realm.objects(allSchemas.LOG);
        // const existLog = allLog.filter(`date = ${newLog.date}`);
        // console.log(existLog);
        realm.write(() => {
            realm.create(allSchemas.LOG, newLog);
            resolve(newLog);
        })
    }).catch((error) => reject(error));
})

export const getAllLog = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const allLogs = realm.objects(allSchemas.LOG);
        resolve(allLogs);
    }).catch((error) => reject(error));
})