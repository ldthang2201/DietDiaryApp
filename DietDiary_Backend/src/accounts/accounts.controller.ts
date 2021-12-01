import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { Weight } from 'src/weights/weight';
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
        return {
            result: 'OK',
            message: 'Login successfully',
            accounts: getAccount,
            statusCode: 200
        }
    }

    @Get('/test')
    @HttpCode(200)
    async setWeightTest(
        @Body('id') id: string,
        @Body('weights') listWeights : [Weight]
    ) {
        // const a = await this.accountService.setWeights("619aff770ffe56bd9340c10b", []);
    }

    @Get('/getWeights/:id')
    @HttpCode(200)
    async getWeight(
        @Param('id') id: string
    ) {
        const listWeight = await this.accountService.getWeights(id);
        return {
            result: 'OK',
            message: 'Login successfully',
            weights: listWeight,
            statusCode: 200
        }
    }

    @Post('/setWeights')
    @HttpCode(200)
    async setWeight(
        @Body('_id') id: string,
        @Body('weights') listWeights : [Weight]
    ) {
        const a = await this.accountService.setWeights(id, listWeights);
        console.log(id);
        console.log(listWeights);
        console.log(a);
    }

}