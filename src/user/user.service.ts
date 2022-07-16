import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/interfaces/IUser.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { Messages } from 'src/enums/messages.enum';
import { IBearer } from 'src/interfaces/IBearer.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly jwtService: JwtService,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ message: string } | undefined> {
    try {
      const { password } = createUserDto;
      const saltRounds = 10;
      const hashedPass = await bcrypt.hash(password, saltRounds);
      createUserDto.password = hashedPass;
      await new this.userModel(createUserDto).save();

      return { message: Messages.userRegistered };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async login(userEmail: Partial<CreateUserDto>): Promise<IBearer | undefined> {
    try {
      const { email, isAdmin, _id } = await this.userModel.findOne({
        email: userEmail,
      });
      const payload = { email, isAdmin, _id };

      return {
        token: this.jwtService.sign(payload),
      };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotAcceptableException(Messages.couldntFindUser);
    }
    const passwordValid = await bcrypt.compare(password, user.password);

    if (user && passwordValid) {
      const { ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException(Messages.wrongPassword);
    }
  }
}
