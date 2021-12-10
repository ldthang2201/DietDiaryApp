
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt = require("bcrypt");
import { comparePassword, encodePassword } from 'src/utls/bcrypt.utls';
import { Calendar } from 'src/models/calendar.model';
import { Log } from 'src/models/log.model';
import { Reminder } from 'src/models/reminder.model';

@Injectable()
export class AccountsService {
    accounts: Account[] = [];

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) { }

    async createAccount(username: string, email: string, password: string) {

        const hashPassword = await encodePassword(password);

        const newAccount = new this.accountModel({
            username: username,
            email: email,
            password: hashPassword,
        });
        const existAccount = await this.accountModel.findOne({ username: username });

        const existEmail = await this.accountModel.findOne({ email: email });

        if (existAccount != null) {
            throw new HttpException({ result: 'Fail', message: 'Account Existed', statusCode: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
        }

        if (existEmail != null) {
            throw new HttpException({ result: 'Fail', message: 'Email had been registered', statusCode: HttpStatus.CONFLICT }, HttpStatus.CONFLICT);
        }

        const result = await newAccount.save();
        return result;
    }

    async login(username: string, password: string) {
        const hashPassword = await encodePassword(password);

        const existAccount = await this.accountModel.findOne({ username: username } || { email: username });
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Username or password is incorrect', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
        }

        if (!comparePassword(password, existAccount.password)) {
            throw new HttpException({ result: 'Fail', message: 'Password is not match', statusCode: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
        }

        return existAccount;
    }

    async getCalendars(objectId: string) {
        const existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        return existAccount.listCalendars;
    }

    async setCalendars(objectId: string, listCalendars: [Calendar]) {
        let existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        let newCalendars = listCalendars;

        newCalendars.forEach(item => {
            const existIndex = existAccount.listCalendars.findIndex(e => e.primaryKey == item.primaryKey || e.date == item.date);
            item.uploadAt = new Date();

            if (existIndex != -1) {
                if (new Date(existAccount.listCalendars[existIndex].updateAt) < new Date(item.updateAt)) {
                    existAccount.listCalendars[existIndex] = item;
                }
            } else {
                existAccount.listCalendars.push(item);
            }
        })

        return await existAccount.save();
    }

    async getLogs(objectId: string) {
        const existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        return existAccount.listLogs.filter(e => e.isDelete == false);
    }

    async setLogs(objectId: string, listLogs: [Log]) {
        let existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        let newLogs = listLogs;

        newLogs.forEach(item => {
            const existIndex = existAccount.listLogs.findIndex(e => e.primaryKey == item.primaryKey);
            item.uploadAt = new Date();

            if (existIndex != -1) {
                if (new Date(existAccount.listLogs[existIndex].updateAt) < new Date(item.updateAt)) {
                    existAccount.listLogs[existIndex] = item;
                }
            } else {
                existAccount.listLogs.push(item);
            }
        })

        return await existAccount.save();
    }

    async getReminders(objectId: string) {
        const existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        return existAccount.listReminders.filter(e => e.isDelete == false);
    }

    async setReminders(objectId: string, listReminders: [Reminder]) {
        let existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        let newReminders = listReminders;

        newReminders.forEach(item => {
            const existIndex = existAccount.listReminders.findIndex(e => e.primaryKey == item.primaryKey);
            item.uploadAt = new Date();

            if (existIndex != -1) {
                if (new Date(existAccount.listReminders[existIndex].updateAt) < new Date(item.updateAt)) {
                    existAccount.listReminders[existIndex] = item;
                }
            } else {
                existAccount.listReminders.push(item);
            }
        })

        return await existAccount.save();
    }

    async getInformation(objectId: string) {
        const existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        return existAccount;
    }

    async setInformation(objectId: string, information: Account) {
        let existAccount = await this.accountModel.findById(objectId);
        if (existAccount == null) {
            throw new HttpException({ result: 'Fail', message: 'Account not exist', statusCode: HttpStatus.NOT_FOUND }, HttpStatus.NOT_FOUND);
        };

        if (new Date(existAccount.updateAt) < new Date(information.updateAt)) {
            console.log("update");
            existAccount.fullname = information.fullname;
            existAccount.dob = information.dob;
            existAccount.height = information.height;
            existAccount.updateAt = new Date(information.updateAt);
            existAccount.dateUsingApp = information.dateUsingApp;
            existAccount.eatTime = information.eatTime;
            existAccount.exerciseTime = information.exerciseTime;
            existAccount.isUpdate = information.isUpdate;
            existAccount.uploadAt = new Date();
        }

        return await existAccount.save();
    }

}