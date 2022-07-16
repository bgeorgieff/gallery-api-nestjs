import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Controllers } from 'src/enums/controllers.enum';
import { LocalAuthGuard } from './local.auth.guard';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Endpoints } from 'src/enums/endpoints.enum';

@Controller(Controllers.user)
@ApiTags(Controllers.users)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post(Endpoints.register)
  @ApiBody({ type: CreateUserDto })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post(Endpoints.login)
  @ApiBody({ type: CreateUserDto })
  login(@Body('email') email: Partial<CreateUserDto>) {
    return this.userService.login(email);
  }
}
