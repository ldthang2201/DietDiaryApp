import Realm from "realm";
import { Information } from "./Information";
import { Log } from "./Log";
import { Weights } from "./Weights";

export const databaseOptions = {
    path: 'DietDiary.realm',
    schema: [Information, Weights, Log],
    schemaVersion: 1,
}

export default new Realm(databaseOptions);