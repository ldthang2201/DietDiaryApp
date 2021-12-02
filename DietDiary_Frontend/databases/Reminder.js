import Realm from "realm";
import allSchemas from "./allSchemas"
import { databaseOptions } from "./database";

export const Reminder = {
    name: allSchemas.REMINDER,
    properties: {
        primaryKey: { type: "string", default: new Date().getTime().toString() },
        hour: { type: "int", default: "0"},
        minute: { type: "int", default: "0"},
        type: "string",
        isNotify: { type: "bool", default: false},
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date?",
        isUpdate: { type: "bool", default: false },
        isDelete: { type: "bool", default: false },
    },
    primaryKey: "primaryKey"
}