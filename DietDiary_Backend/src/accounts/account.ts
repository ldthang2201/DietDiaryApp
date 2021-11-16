import { raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String},
    dob: { type: Date},
    sex: { type: Boolean},
    height: { type: Number},
    isVerify: { type: Boolean, default: false},
    createAt: { type: Date, default: new Date()},
    updateAt: { type: Date, default: new Date()},
    uploadAt: { type: Date, default: new Date()},
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
    isVerify: boolean;
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isDelete: boolean;
}
