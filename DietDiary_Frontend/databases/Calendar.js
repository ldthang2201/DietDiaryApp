import Realm from "realm";
import { getDateWithString } from "../utils/DatetimeUtls";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";
import { getListLogsByDate } from "./Log";

export const Calendar = {
    name: allSchemas.CALENDAR,
    properties: {
        primaryKey: { type: "string", default: new Date().getTime().toString() },
        date: { type: "string" },
        // times achieved in day
        eatTime: { type: "int", default: 3 },
        // times complete
        eatingTime: { type: "int", default: 0 },
        // times achieved in day
        exerciseTime: { type: "int", default: 1 },
        // times complete
        doExerciseTime: { type: "int", default: 0 },
        // weight now
        weight: { type: "float" },
        // weight yesterday
        preWeight: { type: "float" },
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date?",
        isUpdate: { type: "bool", default: false },
        isDelete: { type: "bool", default: false },
    }
}

/**
 * Get last item in database (last date)
 * @returns 
 */
export const getLastCalendar = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        let lastCalendar = realm.objects(allSchemas.CALENDAR);
        if (lastCalendar.length > 0) {
            lastCalendar.sorted("date");
            resolve(lastCalendar[lastCalendar.length - 1]);
        } else {
            resolve(null)
        }
    }).catch(error => reject(error));
})

/**
 * Create new Calendar with date if null
 * @param {Calendar} newCalendar 
 * @returns 
 */
export const createNewCalendar = (newCalendar) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let currentCalendar = realm.objects(allSchemas.CALENDAR).find(current => current.date == newCalendar.date);
            if (currentCalendar == null) {
                realm.create(allSchemas.CALENDAR, newCalendar);
            }
            resolve();
        })
    }).catch(error => reject(error));
})

export const updateWeight = (newWeight) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let currentCalendar = realm.objects(allSchemas.CALENDAR).find(current => current.date == getDateWithString());
            if (currentCalendar != null) {
                currentCalendar.weight = newWeight;
                currentCalendar.updateAt = new Date();
                currentCalendar.isUpdate = true;
            }
            resolve();
        })
    }).catch(error => reject(error));
})

export const getTodayCalendar = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentCalendar = realm.objects(allSchemas.CALENDAR).find(current => current.date == getDateWithString());
        resolve(currentCalendar);
    }).catch(error => reject(error));
})

export const getAllCalendars = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const currentCalendar = realm.objects(allSchemas.CALENDAR).filter(current => current.isDelete == false);
        resolve(currentCalendar);
    }).catch(error => reject(error));
})

/**
 * Update Calendar if log change by date
 * @param {format YYYY_MM_DD : string} date 
 * @returns 
 */
export const updateCalendar = (date) => new Promise((resolve, reject) => {
    const EATING_TYPE = 'eating';
    const EXERCISE_TYPE = 'exercise';
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const calendar = realm.objects(allSchemas.CALENDAR).find(current => current.date == date);
            if (calendar != null) {
                const listAllLogs = realm.objects(allSchemas.LOG);
                const listLog = listAllLogs.filter(log => log.date == date);
                let eatCount = 0;
                let exeCount = 0;
                listLog.forEach(element => {
                    if (element.type == EATING_TYPE) {
                        eatCount++;
                    } else {
                        exeCount++;
                    }
                })

                calendar.eatingTime = eatCount;
                calendar.doExerciseTime = exeCount;
            }
        })
        resolve();
    }).catch(error => reject(error));
})

export const updateCalendarTimes = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            const currentInfo = realm.objects(allSchemas.INFORMATION).filter(item => item.isDelete == false);
            let result = {};
            if (currentInfo.length > 0) {
                result = currentInfo[0];
                let currentCalendar = realm.objects(allSchemas.CALENDAR).find(current => current.date == getDateWithString());
                if (currentCalendar) {
                    currentCalendar.eatTime = result.eatingTime;
                    currentCalendar.exerciseTime = result.doExerciseTime;
                }
            }
        })
        resolve();
    }).catch(error => reject(error));
})