import { Body, Controller, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
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
        const newAccount = await this.accountService.createAccount(username, email, password);
        return { accounts: newAccount };
    }

    @Get('/login')
    @HttpCode(200)
    async login(
        @Body('username') username: string,
        @Body('password') password: string
    ) {
        const getAccount = await this.accountService.login(username, password);
        return {accounts: getAccount}
    }

    @Get()
    getAllAccounts() {
        return { accounts: this.accountService.getAccounts() };
    }

    @Get(':username')
    getAccount(
        @Param('username') username: string
    ) {
        console.log(username)
        return this.accountService.getAccount(username);
    }

    @Patch()
    updatePassword(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string
    ) {
        return this.accountService.updatePassword(username, email, password);
    }

}