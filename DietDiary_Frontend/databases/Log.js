import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Log = {
    name: allSchemas.LOG,
    properties: {
        primaryKey: { type: "string", default: new Date().getTime().toString() },
        date: "string",
        time: "string",
        type: "string",
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date?",
        isUpdate: { type: "bool", default: false },
        isDelete: { type: "bool", default: false },
    },
    primaryKey: "primaryKey"
}

export const createNewLog = newLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
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

export const updateLogTime = (id, newTime) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let existLog = realm.objectForPrimaryKey(allSchemas.LOG, id);
            existLog.time = newTime;
            existLog.isUpdate = true;
            resolve();
        })
    }).catch((error) => reject(error));
})

export const deleteLog = lstSelectedLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            lstSelectedLog.forEach(element => {
                realm.delete(realm.objectForPrimaryKey(allSchemas.LOG, element.primaryKey))
            });
            resolve();
        })
    }).catch((error) => reject(error));
})

export const getListLogsByDate = date => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const listAllLogs = realm.objects(allSchemas.LOG);
        const listLog = listAllLogs.filter(log => log.date == date);
        resolve(listLog);
    }).catch((error) => reject(error));
})