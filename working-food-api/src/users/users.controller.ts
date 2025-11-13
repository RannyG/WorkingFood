import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from './models/user.dto';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  getAllUsers(): Promise<UserDto[]> {
    return this.usersService.getAll();
  }
}
