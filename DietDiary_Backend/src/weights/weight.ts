import * as mongoose from 'mongoose';

export const WeightSchema = new mongoose.Schema({
    _id : {type: String},
    value : {type: Number},
    date : {type: String},
    createAt: { type: Date, default: new Date()},
    updateAt: { type: Date, default: new Date()},
    uploadAt: { type: Date, default: new Date()},
    isDelete: { type: Boolean, default: false}
});

export interface Weight {
    _id: string,
    value: number,
    date: string,
    createAt: Date;
    updateAt: Date;
    uploadAt: Date;
    isDelete: boolean;
}