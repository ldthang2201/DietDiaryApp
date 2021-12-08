import * as mongoose from 'mongoose';

export const CalendarSchema = new mongoose.Schema({
    primaryKey: { type: String },
    date: { type: String },
    eatTime: { type: Number },
    eatingTime: { type: Number },
    exerciseTime: { type: Number },
    doExerciseTime: { type: Number },
    weight: { type: Number },
    preWeight: { type: Number },
    createAt: { type: Date, default: new Date() },
    updateAt: { type: Date, default: new Date() },
    uploadAt: { type: Date, default: new Date() },
    isUpdate: { type: Boolean, default: false },
    isDelete: { type: Boolean, default: false }
});

export interface Calendar {
    primaryKey: string;
    date: string;
    eatTime: number;
    eatingTime: number;
    exerciseTime: number;
    doExerciseTime: number;
    weight: number;
    preWeight: number;
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isUpdate: boolean;
    isDelete: boolean;
}