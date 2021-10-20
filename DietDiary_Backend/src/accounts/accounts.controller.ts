import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { AccountsService } from './accounts.service';

@Controller('account')
export class AccountsController {
    constructor(private readonly accountService: AccountsService) { }

    @Post('/create')
    async createAccount(
        @Body('username') username: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('weights') weights: Record<string, number>
        ) {
        // const generateId = await this.accountService.createAccount(username, email, password);
        return {id : weights}

    }

    @Get()
    getAllAccounts() {
        return {accounts: this.accountService.getAccounts()};
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