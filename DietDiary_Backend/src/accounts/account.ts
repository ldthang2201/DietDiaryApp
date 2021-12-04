import { raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Calendar } from 'src/models/calendar.model';
import { Log } from 'src/models/log.model';
import { Reminder } from 'src/models/reminder.model';

export const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String},
    dob: { type: Date},
    sex: { type: Boolean},
    height: { type: Number},
    listCalendars: {type: Array},
    listLogs: {type: Array},
    listReminders: {type: Array},
    isVerify: { type: Boolean, default: false},
    createAt: { type: Date, default: new Date()},
    updateAt: { type: Date, default: new Date()},
    uploadAt: { type: Date, default: new Date()},
    isUpdate: { type: Boolean, default: false},
    isDelete: { type: Boolean, default: false}
});

export interface Account {
    username: string;
    email: string;
    password: string;
    fullname: string;
    dob: Date;
    sex: boolean;
    height: number;
    listCalendars: [Calendar];
    listLogs: [Log];
    listReminders: [Reminder];
    isVerify: boolean;
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isUpdate: boolean;
    isDelete: boolean;
}
