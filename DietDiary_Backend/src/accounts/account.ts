import { raw } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export const AccountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    fullname: { type: String},
    dob: { type: Date},
    sex: { type: Boolean},
    weights: raw({
        createAt: Date,
        weight: Number,
    }),
    heights:raw({
        createAt: Date,
        weight: Number,
    })
});

export interface Account {
    username: string;
    email: string;
    password: string;
    fullbane: string;
    dob: Date;
    sex: boolean;
    weights: Record<string, number>,
    heights: Record<string, number>,
}
