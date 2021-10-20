import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Information = {
    name:  allSchemas.INFORMATION,
    properties: {
        _id: "int",
        fullname: "string",
        dob: "string",
        height: "float",
        weights: "float",
        update_at:  {type: "date", default: new Date()},
        upload_at: "date",
        delete_flag:  { type: "boolen", default: false},
    },
    primaryKey: "_id",
    
};

export const createInformation = newInformation => Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let info = realm.objects(allSchemas.INFORMATION);
        if (info.length === 0) {
            realm.write(() => {
                realm.create(allSchemas.INFORMATION, newInformation);
                resolve(newInformation);
            })
        } else {
            let currenInfo = info[0];
            currenInfo.fullname = newInformation.fullname;
        }
    }).catch((error) => reject(error));
});

export const getOneInformation = () => Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let info = realm.objects(allSchemas.INFORMATION);
    })
})