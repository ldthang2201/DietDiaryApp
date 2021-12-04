import * as mongoose from 'mongoose';

export const LogSchema = new mongoose.Schema({
    primaryKey: { type: String },
    date: { type: String },
    time: { type: String },
    type: { type: String },
    description: { type: String },
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
    uploadAt: { type: Date, default: new Date() },
    isUpdate: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false }
});

export interface Log {
    primaryKey: string,
    date: string;
    time: string;
    type: string;
    description: { type: String };
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isUpdate: boolean;
    isDelete: boolean;
}