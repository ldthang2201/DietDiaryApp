import Realm from "realm";
import { Calendar } from "./Calendar";
import { Information } from "./Information";
import { Log } from "./Log";
import { Reminder } from "./Reminder";

export const databaseOptions = {
    path: 'DietDiary.realm',
    schema: [Information, Calendar, Log, Reminder],
    schemaVersion: 4,
}

export default new Realm(databaseOptions);