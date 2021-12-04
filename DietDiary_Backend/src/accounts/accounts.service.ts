
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt = require("bcrypt");
import { comparePassword, encodePassword } from 'src/utls/bcrypt.utls';
import { Calendar } from 'src/models/calendar.model';

@Injectable()
export class AccountsService {
    accounts: Account[] = [];

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async createAccount(username: string, email: string, password: string) {

        const hashPassword = await encodePassword(password);

        const newAccount = new this.accountModel({
            username: username,
            email: email,
            password: hashPassword,
        });
        const existAccount = await this.accountModel.findOne({username: username});

        const existEmail = await this.accountModel.findOne({email: email});

        if (existAccount != null) {
            throw new HttpException({result: 'Fail', message: 'Account Existed', statusCode: HttpStatus.CONFLICT}, HttpStatus.CONFLICT);
        }

        if (existEmail != null) {
            throw new HttpException({result: 'Fail', message: 'Email had been registered', statusCode: HttpStatus.CONFLICT}, HttpStatus.CONFLICT);
        }

        const result = await newAccount.save();
        return result;
    }

    async login(username: string, password: string) {
        const hashPassword = await encodePassword(password);

        const existAccount = await this.accountModel.findOne({username: username} || {email: username});
        if (existAccount == null) {
            throw new HttpException({result: 'Fail', message: 'Username or password is incorrect', statusCode: HttpStatus.BAD_REQUEST}, HttpStatus.BAD_REQUEST);
        }

        if (!comparePassword(password, existAccount.password)) {
            throw new HttpException({result: 'Fail', message: 'Password is not match', statusCode: HttpStatus.BAD_REQUEST}, HttpStatus.BAD_REQUEST);
        }

        return existAccount;
    }

    async getCalendars(objectId: string) {
        const existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND}, HttpStatus.NOT_FOUND);
        };

        return existAccount.listCalendars;
    }

    async setCalendars(objectId: string, listCalendars: [Calendar]) {
        let existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND}, HttpStatus.NOT_FOUND);
        };

        let newCalendars = listCalendars;
        existAccount.listCalendars.forEach(item => {
            const existIndex = newCalendars.findIndex(e => e.primaryKey == item.primaryKey);

        })
        newCalendars.forEach(item => {
            const existIndex = existAccount.listCalendars.findIndex(e => e.primaryKey == item.primaryKey);

            if (existIndex != -1) {
                existAccount.listCalendars[existIndex] = item;
            } else {
                existAccount.listCalendars.push(item);
            }
        })

        return await existAccount.save();
    }

}