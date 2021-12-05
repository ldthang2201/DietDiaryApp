import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { Calendar } from 'src/models/calendar.model';
import { Log } from 'src/models/log.model';
import { Reminder } from 'src/models/reminder.model';
import { Account } from './account';
import { AccountsService } from './accounts.service';
import { isValidObjectId } from 'mongoose';

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
        if (id == null || id == undefined || !isValidObjectId(id)) {
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

        if (listCalendars == null || listCalendars == undefined || !isValidObjectId(id)) {
            throw new HttpException('listCalendars is required', HttpStatus.BAD_REQUEST);
        }

        await this.accountService.setCalendars(id, listCalendars)

        return {
            result: 'OK',
            message: 'Set calendars successfully',
            statusCode: 200
        }
    }

    @Get('/getLogs/:id')
    @HttpCode(200)
    async getLogs(
        @Param('id') id: string
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('required id param', HttpStatus.BAD_REQUEST);
        }
        const listLogs = await this.accountService.getLogs(id);
        return {
            result: 'OK',
            message: 'Get successfully',
            listLogs: listLogs,
            statusCode: 200
        }
    }

    @Post('/setLogs')
    @HttpCode(200)
    async setLogs(
        @Body('id') id : string,
        @Body('listLogs') listLogs: [Log]
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
        }

        if (listLogs == null || listLogs == undefined) {
            throw new HttpException('listLogs is required', HttpStatus.BAD_REQUEST);
        }

        await this.accountService.setLogs(id, listLogs)

        return {
            result: 'OK',
            message: 'Set logs successfully',
            statusCode: 200
        }
    }

    @Get('/getReminders/:id')
    @HttpCode(200)
    async getReminders(
        @Param('id') id: string
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('required id param', HttpStatus.BAD_REQUEST);
        }
        const listReminders = await this.accountService.getReminders(id);
        return {
            result: 'OK',
            message: 'Get successfully',
            listReminders: listReminders,
            statusCode: 200
        }
    }

    @Post('/setReminders')
    @HttpCode(200)
    async setReminders(
        @Body('id') id : string,
        @Body('listReminders') listReminder: [Reminder]
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
        }

        if (listReminder == null || listReminder == undefined) {
            throw new HttpException('listReminder is required', HttpStatus.BAD_REQUEST);
        }

        await this.accountService.setReminders(id, listReminder);

        return {
            result: 'OK',
            message: 'Set reminders successfully',
            statusCode: 200
        }
    }

    @Get('/getInformation/:id')
    @HttpCode(200)
    async getInformation(
        @Param('id') id: string
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('required id param', HttpStatus.BAD_REQUEST);
        }
        let information = (await this.accountService.getInformation(id)).toJSON();
        
        delete information.password;
        delete information.listCalendars;
        delete information.listLogs;
        delete information.listReminders;
        return {
            result: 'OK',
            message: 'Get successfully',
            information: information,
            statusCode: 200
        }
    }

    @Post('/setInformation')
    @HttpCode(200)
    async setInformation(
        @Body('id') id : string,
        @Body('information') information: Account
    ) {
        if (id == null || id == undefined || !isValidObjectId(id)) {
            throw new HttpException('id is required', HttpStatus.BAD_REQUEST);
        }

        if (information == null || information == undefined) {
            throw new HttpException('Information is required', HttpStatus.BAD_REQUEST);
        }

        await this.accountService.setInformation(id, information);

        return {
            result: 'OK',
            message: 'Set information successfully',
            statusCode: 200
        }
    }
}