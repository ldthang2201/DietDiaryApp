import Realm from "realm";
import { Information } from "./Information";
import { Weights } from "./Weights";

export const databaseOptions = {
    path: 'DietDiary.realm',
    schema: [Information, Weights],
    schemaVersion: 0,
}