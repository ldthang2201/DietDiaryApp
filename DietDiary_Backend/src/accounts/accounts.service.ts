
import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
        const existAccount = await this.accountModel.findOne({username: username});
        if (existAccount != null) {
            throw new HttpException('Account Existed', HttpStatus.CONFLICT);
        }

        const result = await newAccount.save();
        return result;
    }

    async login(username: string, password) {
        const existAccount = await this.accountModel.findOne({username: username} || {email: username});
        if (existAccount == null) {
            throw new HttpException('Username or password is incorrect', HttpStatus.BAD_REQUEST);
        }

        if (existAccount.password != password) {
            throw new HttpException('Username or password is incorrect', HttpStatus.BAD_REQUEST);
        }

        return existAccount;
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