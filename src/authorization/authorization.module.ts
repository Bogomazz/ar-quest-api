import {Module} from "@nestjs/common";
import {AuthorizationService} from "./authorization.service";
import {AuthorizationController} from "./authorization.controller";
import {LocalStrategy} from "./local.strategy";
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtModule} from "@nestjs/jwt";
import {jwtConstants} from "./jwt.constants";
import {JwtStrategy} from "./jwt.strategy";

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [AuthorizationService, LocalStrategy, JwtStrategy],
  controllers: [AuthorizationController],
  exports: [AuthorizationService]
})
export class AuthorizationModule {

}