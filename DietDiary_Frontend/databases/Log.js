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
        update_at: { type: "date", default: new Date() },
        upload_at: "date?",
        delete_flag: { type: "bool", default: false },
    },
    primaryKey: "_id",
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
            resolve();
        })
    }).catch((error) => reject(error));
})

export const deleteLog = lstSelectedLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            lstSelectedLog.forEach(element => {
                realm.delete(realm.objectForPrimaryKey(allSchemas.LOG, element._id))
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