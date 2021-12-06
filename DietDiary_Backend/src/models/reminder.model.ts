import * as mongoose from 'mongoose';

export const ReminderSchema = new mongoose.Schema({
    primaryKey: { type: String },
    hour: { type: Number },
    minute: { type: Number },
    type: { type: String },
    order: { type: Number },
    isNotify: { type: Boolean, default: false },
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
    uploadAt: { type: Date, default: new Date() },
    isUpdate: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false }
});

export interface Reminder {
    primaryKey: string;
    hour: number;
    minute: number;
    type: string;
    order: number;
    isNotify: boolean;
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isUpdate: boolean;
    isDelete: boolean;
}