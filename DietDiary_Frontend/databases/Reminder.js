import Realm from "realm";
import { NotificationService } from "../services/NotificationService";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

// reminder constant
const numberSlice = 6;
const EatingOneTime = [11];
const EatingTwoTime = [7, 12];
const EatingThreeTime = [6, 12, 18];
const EatingFourTime = [6, 10, 14, 18];
const EatingFiveTime = [6, 9, 12, 15, 18];
const EatingSixTime = [6, 8, 11, 14, 16, 18];
const ExerciseOneTime = [17];
const ExerciseTwoTime = [5, 17];
const ExerciseThreeTime = [5, 17, 20];
const weighHour = 5;
const weighMinute = 30;

export const EATING_TYPE = "eat";
export const EXERCISE_TYPE = "exercise";
export const WEIGH_TYPE = "weigh";

export const Reminder = {
    name: allSchemas.REMINDER,
    properties: {
        primaryKey: { type: "string", default: new Date().getTime().toString() },
        hour: { type: "int", default: "0" },
        minute: { type: "int", default: "0" },
        type: "string",
        isNotify: { type: "bool", default: false },
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date?",
        isUpdate: { type: "bool", default: false },
        isDelete: { type: "bool", default: false },
    },
    primaryKey: "primaryKey"
}

export const resetEatingReminder = (times) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            // soft delete all reminder of eating
            const listEatingReminder = realm.objects(allSchemas.REMINDER).filter(item => item.isDelete == false && item.type == EATING_TYPE);
            if (listEatingReminder) {
                listEatingReminder.forEach(item => {
                    item.isDelete = true;
                    if (item.isNotify) {
                        NotificationService.cancelNotification(item.primaryKey.slice(numberSlice)).then().catch(error => console.log(error));
                    }
                })
            }

            switch (times) {
                case 1:
                    EatingOneTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 2:
                    EatingTwoTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 3:
                    EatingThreeTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 4:
                    EatingFourTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 5:
                    EatingFiveTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 6:
                    EatingSixTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EATING_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                default:
                    break;
            }
        });
        resolve();
    }).catch(error => reject(error));
})

export const resetExerciseReminder = (times) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            // soft delete all reminder of eating
            const listExerciseReminder = realm.objects(allSchemas.REMINDER).filter(item => item.isDelete == false && item.type == EXERCISE_TYPE);
            if (listExerciseReminder) {
                listExerciseReminder.forEach(item => {
                    item.isDelete = true;
                    if (item.isNotify) {
                        NotificationService.cancelNotification(item.primaryKey.slice(numberSlice)).then().catch(error => console.log(error));
                    }
                })
            }

            switch (times) {
                case 1:
                    ExerciseOneTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EXERCISE_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 2:
                    ExerciseTwoTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EXERCISE_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                case 3:
                    ExerciseThreeTime.forEach((item) => {
                        const newReminder = {
                            primaryKey: `${new Date().getTime().toString()}${item}`,
                            hour: item,
                            minute: 0,
                            type: EXERCISE_TYPE,
                        };
                        realm.create(allSchemas.REMINDER, newReminder);
                    });
                    break;
                default:
                    break;
            }
        });
        resolve();
    }).catch(error => reject(error));
})

export const resetWeighReminder = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            // soft delete all reminder of eating
            const listWeighReminder = realm.objects(allSchemas.REMINDER).filter(item => item.isDelete == false && item.type == WEIGH_TYPE);
            if (listWeighReminder) {
                listWeighReminder.forEach(item => {
                    item.isDelete = true;
                    if (item.isNotify) {
                        NotificationService.cancelNotification(item.primaryKey.slice(numberSlice)).then().catch(error => console.log(error));
                    }
                })
            }

            const newReminder = {
                primaryKey: `${new Date().getTime().toString()}${weighHour}`,
                hour: weighHour,
                minute: weighMinute,
                type: WEIGH_TYPE,
            };
            realm.create(allSchemas.REMINDER, newReminder);
        });
        resolve();
    }).catch(error => reject(error));
})

export const getAllReminders = () => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        const allReminders = realm.objects(allSchemas.REMINDER).filter(item => item.isDelete == false);
        if (!allReminders) {
            resolve([]);
        }
        resolve(allReminders);
    }).catch((error) => reject(error));
});

export const updateReminderNotify = (item, isNotify) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let reminder = realm.objectForPrimaryKey(allSchemas.REMINDER, item.primaryKey);
            if (reminder) {
                reminder.hour = item.hour;
                reminder.minute = item.minute;
                reminder.isNotify = isNotify;
                reminder.updateAt = new Date();
                if (reminder.uploadAt) {
                    reminder.isUpdate = true;
                }

                if (isNotify) {
                    // create new notification with new time
                    switch (reminder.type) {
                        case EATING_TYPE:
                            NotificationService.createEatNotification(reminder.primaryKey.slice(numberSlice), reminder.hour, reminder.minute);
                            break;
                        case EXERCISE_TYPE:
                            NotificationService.createExerciseNotification(reminder.primaryKey.slice(numberSlice), reminder.hour, reminder.minute);
                            break;
                        case WEIGH_TYPE:
                            NotificationService.createWeighNotification(reminder.primaryKey.slice(numberSlice), reminder.hour, reminder.minute);
                            break;
                        default:
                            break;
                    }
                } else {
                    NotificationService.cancelNotification(reminder.primaryKey.slice(numberSlice));
                }
            }
        })
        resolve();
    }).catch((error) => reject(error));
});

/**
 * update time of reminder by prikaryKey
 * @param {Primarykey: String} primaryKey 
 * @param {Hour: int} hour 
 * @param {Minute: int} minute 
 * @returns 
 */
export const updateReminderTime = (primaryKey, hour, minute) => new Promise((resolve, reject) => {
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            let reminder = realm.objectForPrimaryKey(allSchemas.REMINDER, primaryKey);
            if (reminder) {
                reminder.hour = hour;
                reminder.minute = minute;
                reminder.updateAt = new Date();
                if (reminder.uploadAt) {
                    reminder.isUpdate = true;
                }
            }

            // cancel notification with old time
            if (reminder.isNotify) {
                NotificationService.cancelNotification(reminder.primaryKey.slice(numberSlice));

                // create new notification with new time
                switch (reminder.type) {
                    case EATING_TYPE:
                        NotificationService.createEatNotification(reminder.primaryKey.slice(numberSlice), hour, minute);
                        break;
                    case EXERCISE_TYPE:
                        NotificationService.createExerciseNotification(reminder.primaryKey.slice(numberSlice), hour, minute);
                        break;
                    case WEIGH_TYPE:
                        NotificationService.createWeighNotification(reminder.primaryKey.slice(numberSlice), hour, minute);
                        break;
                    default:
                        break;
                }
            }
        })
        resolve();
    }).catch((error) => reject(error));
});