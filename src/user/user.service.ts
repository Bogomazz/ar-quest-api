import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  public create(userData: User): Promise<User> {
    return this.userRepository.save(userData);
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  public findOne(email: string): Promise<User> {
    return this.userRepository.findOne({email});
  }
}