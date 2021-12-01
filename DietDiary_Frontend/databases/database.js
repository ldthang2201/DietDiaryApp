import Realm from "realm";
import { Calendar } from "./Calendar";
import { Information } from "./Information";
import { Log } from "./Log";

export const databaseOptions = {
    path: 'DietDiary.realm',
    schema: [Information, Calendar, Log],
    schemaVersion: 1,
}

export default new Realm(databaseOptions);