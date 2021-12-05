import { getSyncDataCalendar, mergeCalendarsToLocal, updateCalendarAfterSync } from "../databases/Calendar";
import { getOne, mergeInfoToLocal } from "../databases/Information"
import { getSyncDataLogs, mergeLogsToLocal, updateLogAfterSync } from "../databases/Log";
import { getSyncDataReminders, mergeRemindersToLocal, updateReminderAfterSync } from "../databases/Reminder";
import { getCalendars, getInformation, getLogs, getReminders, setCalendars, setInformation, setLogs, setReminders } from "../services/NetworkService"

export const syncGetInfor = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await getInformation(currentUser.primaryKey);
        if (result.result == "OK") {
            if (result.information) {
                console.log(result.information);
                mergeInfoToLocal(result.information);
            }
        }
        return result;
    }
}

export const syncSetInfo = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await setInformation(currentUser.primaryKey, currentUser);
        console.log(result);
        return (result);
    }
}

export const syncGetCalendars = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await getCalendars(currentUser.primaryKey);
        console.log(result);
        if (result.result == "OK" && result.listCalendars) {
            mergeCalendarsToLocal(result.listCalendars);
        }
        return (result);
    }
}

export const syncSetCalendars = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const listCalendars = await getSyncDataCalendar();
        if (listCalendars && listCalendars.length > 0) {
            const result = await setCalendars(currentUser.primaryKey, listCalendars);
            console.log(result);
            if (result.result == "OK") {
                updateCalendarAfterSync();
            }
            return (result);
        } else {
            return {
                result: "OK"
            }
        }
    }
}

export const syncGetLogs = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await getLogs(currentUser.primaryKey);
        console.log(result);
        if (result.result == "OK" && result.listLogs) {
            mergeLogsToLocal(result.listLogs);
        }
        return (result);
    }
}

export const syncSetLogs = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const listLogs = await getSyncDataLogs();
        if (listLogs && listLogs.length > 0) {
            const result = await setLogs(currentUser.primaryKey, listLogs);
            console.log(result);
            if (result.result == "OK") {
                updateLogAfterSync();
            }
            return (result);
        } else {
            return {
                result: "OK"
            }
        }
    }
}

export const syncGetReminders = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await getReminders(currentUser.primaryKey);
        console.log(result);
        if (result.result == "OK" && result.listReminders) {
            mergeRemindersToLocal(result.listReminders);
        }
        return (result);
    }
}

export const syncSetReminders = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const listReminders = await getSyncDataReminders();
        console.log(listReminders);
        if (listReminders && listReminders.length > 0) {
            const result = await setReminders(currentUser.primaryKey, listReminders);
            console.log(result);
            if (result.result == "OK") {
                updateReminderAfterSync();
            }
            return (result);
        } else {
            return {
                result: "OK"
            }
        }
    }
}

export const syncAll = async () => {
    // get Information
    const getInfor = await syncGetInfor();
    if (getInfor && getInfor.result == "OK") {
        // set Information
        const setInfor = await syncSetInfo();
        if (setInfor && setInfor.result == "OK") {
            // get Calendars
            const getCalendars = await syncGetCalendars();
            if (getCalendars && getCalendars.result == "OK") {
                // set Calendars
                const setCalendars = await syncSetCalendars();
                console.log(setCalendars);
                if (setCalendars && setCalendars.result == "OK") {
                    // get Logs
                    const getLogs = await syncGetLogs();
                    if (getLogs && getLogs.result == "OK") {
                        // set Logs
                        const setLogs = await syncSetLogs();
                        if (setLogs && setLogs.result == "OK") {
                            // set Reminder
                            const getReminders = await syncGetReminders();
                            if (getReminders && getReminders.result == "OK") {
                                // get Reminders
                                const setReminders = await syncSetReminders();
                                if (setReminders && setReminders.result == "OK") {
                                    return true;
                                } else {
                                    console.log(8);
                                    return false;
                                }
                            } else {
                                console.log(7);
                                return false;
                            }
                        } else {
                            console.log(6);
                            return false;
                        }
                    } else {
                        console.log(5);
                        return false;
                    }
                } else {
                    console.log(4);
                    return false;
                }
            } else {
                console.log(3);
                return false;
            }
        } else {
            console.log(2);
            return false;
        }
    } else {
        console.log(1);
        return false;
    }
}