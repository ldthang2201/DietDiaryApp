import Realm from "realm";
import allSchemas from "./allSchemas"

export const Weights = {
    name:  allSchemas.WEIGHTS,
    properties: {
        _id: {type: "string", default: new Date().getTime().toString()},
        create_at: { type: "date", default: new Date() },
        value: "float",
        createAt: { type: "date", default: new Date() },
        updateAt: { type: "date", default: new Date() },
        uploadAt: "date",
        isDelete: { type: "bool", default: false},
    }
}