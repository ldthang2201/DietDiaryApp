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
        description: { type: "string?", default: "" },
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
        const allLogs = realm.objects(allSchemas.LOG).filter(e => e.isDelete == false);
        resolve(allLogs);
    }).catch((error) => reject(error));
})

export const updateLogTime = (id, newTime) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let existLog = realm.objectForPrimaryKey(allSchemas.LOG, id);
            existLog.time = newTime;
            existLog.updateAt = new Date();
            existLog.isUpdate = true;
            resolve();
        })
    }).catch((error) => reject(error));
})

export const deleteLog = lstSelectedLog => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            lstSelectedLog.forEach(element => {
                let deletedLog = realm.objectForPrimaryKey(allSchemas.LOG, element.primaryKey);
                deletedLog.isDelete = true;
                deletedLog.updateAt = new Date();
                deletedLog.isUpdate = true;
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

export const updateDescription = (primaryKey, description) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let existLog = realm.objectForPrimaryKey(allSchemas.LOG, primaryKey);
            existLog.description = description;
            existLog.updateAt = new Date();
            existLog.isUpdate = true;
            resolve();
        })
    }).catch((error) => reject(error));
})

/**
 * Merge data server to data local
 * @param {*} listLogs 
 * @returns 
 */
export const mergeLogsToLocal = (listLogs) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            listLogs.forEach(item => {
                let existItem = realm.objects(allSchemas.LOG).find(e => e.primaryKey == item.primaryKey);
                if (existItem) {
                    if (new Date(existItem.updateAt) < new Date(item.updateAt)) {
                        existItem.date = item.date;
                        existItem.description = item.description;
                        existItem.time = item.time;
                        existItem.type = item.type;
                        existItem.updateAt = item.updateAt;
                        existItem.uploadAt = item.uploadAt;
                        existItem.isDelete = item.isDelete;
                    }
                } else {
                    realm.create(allSchemas.LOG, item);
                }
            })
        })
        resolve();
    }).catch(error => reject(error));
})

/**
 * Get list of Logs need to sync
 * @returns 
 */
export const getSyncDataLogs = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const listLogs = realm.objects(allSchemas.LOG).filter(item => {
            if (item.uploadAt == null) {
                return item;
            } else if (item.isUpdate) {
                return item;
            }
        })
        resolve(listLogs);
    }).catch(error => reject(error));
})

export const updateLogAfterSync = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let listNewLogs = realm.objects(allSchemas.LOG).filter(item => {
                if (item.uploadAt == null) {
                    return item;
                } else if (item.isUpdate) {
                    return item;
                }
            });

            listNewLogs.forEach(item => {
                item.isUpdate = false;
                item.uploadAt = new Date();
            })
        })
        resolve();
    }).catch(error => reject(error));
})