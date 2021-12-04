import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Calendar } from 'src/models/calendar.model';
import { AccountsService } from './accounts.service';

@Controller('dietdiary')
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
        let getAccount = await this.accountService.login(username, password);

        let result = getAccount.toJSON();

        delete result.password;
        delete result.listCalendars;
        delete result.listLogs;
        delete result.listReminders;
        return {
            result: 'OK',
            message: 'Login successfully',
            accounts: result,
            statusCode: 200
        }
    }

    @Get('/getCalendars/:id')
    @HttpCode(200)
    async getCalendars(
        @Param('id') id: string
    ) {
        if (id == null || id == undefined) {
            throw new HttpException('required id param', HttpStatus.BAD_REQUEST);
        }
        const listCalendars = await this.accountService.getCalendars(id);
        return {
            result: 'OK',
            message: 'Get successfully',
            listCalendars: listCalendars,
            statusCode: 200
        }
    }

    @Post('/setCalendars')
    @HttpCode(200)
    async setCalendars(
        @Body('id') id : string,
        @Body('listCalendars') listCalendars: [Calendar]
    ) {
        if (id == null || id == undefined) {
            throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
        }

        if (listCalendars == null || listCalendars == undefined) {
            throw new HttpException('listCalendars is required', HttpStatus.BAD_REQUEST);
        }

        await this.accountService.setCalendars(id, listCalendars)

        return {
            result: 'OK',
            message: 'Set calendars successfully',
            statusCode: 200
        }
    }

}