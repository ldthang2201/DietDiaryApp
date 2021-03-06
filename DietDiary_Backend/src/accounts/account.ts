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
    dob: { type: String},
    sex: { type: Boolean},
    height: { type: Number},
    eatTime: { type: Number},
    exerciseTime: {type:Number},
    listCalendars: {type: Array},
    listLogs: {type: Array},
    listReminders: {type: Array},
    dateUsingApp: { type: String},
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
    dob: string;
    sex: boolean;
    height: number;
    eatTime: number;
    exerciseTime: number;
    listCalendars: [Calendar];
    listLogs: [Log];
    listReminders: [Reminder];
    dateUsingApp: string;
    isVerify: boolean;
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isUpdate: boolean;
    isDelete: boolean;
}
