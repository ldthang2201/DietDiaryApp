import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('account')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) { }

    @Post('/create')
    @HttpCode(201)
    async createAccount(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        if (username === undefined || email === undefined || password === undefined) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const newAccount = await this.accountService.createAccount(username, email, password);
        return { 
            result: 'OK', 
            message: 'Create account successfully', 
            accounts: newAccount, 
            statusCode: 201
        };
    }

    @Post('/login')
    @HttpCode(200)
    async login(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        if (username === undefined || password === undefined) {
            throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        }
        const getAccount = await this.accountService.login(username, password);
        return{ 
            result: 'OK', 
            message: 'Login successfully', 
            accounts: getAccount, 
            statusCode: 200
        }
    }

    // @Get()
    // getAllAccounts() {
    //     return { accounts: this.accountService.getAccounts() };
    // }

    // @Get(':username')
    // getAccount(
    //     @Param('username') username: string
    // ) {
    //     console.log("sss" + username);
    //     console.log('that is param')
    // }

    // @Patch()
    // updatePassword(
    //     @Body('username') username: string,
    //     @Body('email') email: string,
    //     @Body('password') password: string
    // ) {
    //     return this.accountService.updatePassword(username, email, password);
    // }

}