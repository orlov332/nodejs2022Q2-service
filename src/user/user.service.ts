import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  create(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    return this.userRepository.create(user);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  findOne(id: string) {
    return this.userRepository.findOne(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id);
    if (user) {
      if (user.password === updateUserDto.oldPassword) {
        const updateObj = {
          ...user,
          password: updateUserDto.newPassword,
          version: user.version + 1,
          updatedAt: Date.now(),
        };
        return await this.userRepository.update(id, updateObj);
      } else throw new ForbiddenException();
    } else throw new NotFoundException();
  }

  remove(id: string) {
    return this.userRepository.remove(id);
  }
}
