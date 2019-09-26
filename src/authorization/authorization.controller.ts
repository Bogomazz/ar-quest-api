import {Body, Controller, Post, UseGuards, Request, Get} from "@nestjs/common";
import {RegisterDTO} from "./register.dto";
import {UserService} from "../user/user.service";
import {AuthGuard} from "@nestjs/passport";
import {AuthorizationService} from "./authorization.service";
//TODO: add interceptor that hide hash and salt
@Controller('auth')
export class AuthorizationController {

  constructor(
    private readonly authService: AuthorizationService
  ){}

  @Post('register')
  public register(
    @Body() body: RegisterDTO
  ) {
    return this.authService.register(body);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  public async login(@Request() req){
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  public getUser(@Request() req) {
    return req.user;
  }

}