import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltOrRounds = Number(process.env.CRYPT_SALT) || 10;

@Injectable()
export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, saltOrRounds);
    return this.repository.create(createUserDto).then((user) => new User(user));
  }

  async findAll() {
    // throw new Error('Test error');
    return this.repository.findAll().then((users) => users.map((user) => new User(user)));
  }

  async findOne(id: string) {
    const user = await this.repository.findOne(id);
    if (user) return new User(user);
    else throw new NotFoundException();
  }

  async isMatchPassword(user: User, password: string): Promise<boolean> {
    return await bcrypt.compare(password, user.password);
  }

  async updatePassword(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOne(id);
    if (user) {
      if (await this.isMatchPassword(user, updateUserDto.oldPassword)) {
        const updateObj = {
          ...user,
          password: updateUserDto.newPassword,
          version: user.version + 1,
        };
        return await this.repository.update(id, updateObj).then((user) => new User(user));
      } else throw new ForbiddenException();
    } else throw new NotFoundException();
  }

  async remove(id: string) {
    const deleted = await this.repository.remove(id);
    if (deleted) return deleted;
    else throw new NotFoundException();
  }

  async findByLogin(login: string) {
    const user = await this.repository.findOneByLogin(login);
    if (user) return new User(user);
    else return undefined;
  }
}
