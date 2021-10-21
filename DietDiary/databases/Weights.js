import Realm from "realm";
import allSchemas from "./allSchemas"

export const Weights = {
    name:  allSchemas.WEIGHTS,
    properties: {
        _id: "int",
        create_at: { type: "date", default: new Date() },
        value: "float",
        update_at: { type: "date", default: new Date() },
        upload_at: "date",
        delete_flag: { type: "bool", default: false},
    }
}