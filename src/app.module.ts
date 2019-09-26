import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserModule} from "./user/user.module";
import {dbConfig} from "./database/config";
import {AuthorizationModule} from "./authorization/authorization.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(dbConfig),
    AuthorizationModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
