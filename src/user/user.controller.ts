import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto).then((user) => new User(user));
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new User(user));
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const user = await this.userService.findOne(id);
    if (user) return new User(user);
    else throw new NotFoundException();
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto).then((user) => new User(user));
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    const deleted = await this.userService.remove(id);
    if (deleted) return deleted;
    else throw new NotFoundException();
  }
}
