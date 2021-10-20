import { Module } from '@nestjs/common';
import { AccountsModule } from './accounts/accounts.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [AccountsModule, MongooseModule.forRoot('mongodb+srv://root:root@dietdiary.qcmgq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
