import { getSyncDataCalendar, mergeToCalendarsLocal, updateCalendarAfterSync } from "../databases/Calendar";
import { getOne, mergeInfoToLocal } from "../databases/Information"
import { getCalendars, getInformation, setCalendars, setInformation } from "../services/NetworkService"

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
    }
}

export const syncSetInfo = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await setInformation(currentUser.primaryKey, currentUser);
        console.log(result);
    }
}

export const syncGetCalendars = async () => {
    const currentUser = await getOne();
    if (currentUser.username) {
        const result = await getCalendars(currentUser.primaryKey);
        console.log(result);
        mergeToCalendarsLocal(result.listCalendars);
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
        }
    }
}