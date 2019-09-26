import {Injectable} from "@nestjs/common";
import * as crypto from "crypto";
import {UserService} from "../user/user.service";
import {User} from "../user/user.entity";
import {JwtService} from "@nestjs/jwt";
import {RegisterDTO} from "./register.dto";

@Injectable()
export class AuthorizationService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  public async getValidUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(email);
    if (!user) {
      return null;
    }
    const { hash } = this.createHash(password, user.salt);
    if ( user.hash === hash) {
      return user;
    }

    return null;
  }

  public async register(registerData: RegisterDTO) {
    const {salt, hash} = this.createHash(registerData.password);
    const {password, ...userData} = registerData;
    return this.userService.create({
      ...userData,
      salt,
      hash
    })
  }

  public async login(user: any) {
    const payload = {
      email: user.email,
      sub: user.id,
      name: user.name
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private createHash(password: string, salt?: string): {salt: string, hash: string} {
    if (!salt) {
      salt = crypto.randomBytes(16).toString('hex');
    }
    const hashAlg = crypto.createHmac('sha512', salt).update(password);
    const hash = hashAlg.digest('hex');
    return {salt, hash};
  }
}