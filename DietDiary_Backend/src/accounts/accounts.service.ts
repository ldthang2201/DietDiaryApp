
import { Injectable, NotFoundException } from '@nestjs/common';
import { Account } from './account';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class AccountsService {
    accounts: Account[] = [];

    constructor(@InjectModel('Account') private readonly accountModel: Model<Account>) {}

    async createAccount(username: string, email: string, password: string) {
        const newAccount = new this.accountModel({
            username: username,
            email: email,
            password: password,
        });
        const result = await newAccount.save();
        console.log(result);
        return result.id as string;
    }

    getAccounts() {
        return new Date().toString();
    }

    getAccount(username: string) {
        const account = this.accounts.find(acc => acc.username === username);
        if (!account) {
            throw new NotFoundException('Could not find account');
        }
        return {...account};
    }

    updatePassword(username: string, email: string, password: string) {
        console.log(username)
        const account = this.accounts.find(acc => acc.username === username);
        if (!account) {
            throw new NotFoundException('Could not find account');
        }
        account.password = password;
        return {...account};
    }
}