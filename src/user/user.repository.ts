import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { IRepository } from '../common/repository';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import Prisma from '@prisma/client';

function dbUserToDto(user: Prisma.User): User {
  if (user) {
    const { createdAt, updatedAt, ...rest } = user;
    return {
      ...rest,
      createdAt: createdAt.getUTCMilliseconds(),
      updatedAt: updatedAt.getUTCMilliseconds(),
    };
  } else return undefined;
}

@Injectable()
export class UserRepository implements IRepository<User> {
  constructor(private readonly prisma: PrismaService) {}

  async create({ login, password }: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data: { login, password, version: 1 } }).then(dbUserToDto);
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany().then((users) => users.map(dbUserToDto));
  }

  async findOne(id: string): Promise<User | undefined> {
    return this.prisma.user
      .findUnique({
        where: { id },
      })
      .then(dbUserToDto);
  }

  async remove(id: string): Promise<number> {
    return this.prisma.user
      .delete({
        where: { id },
      })
      .then(() => 1)
      .catch(() => 0);
  }

  async update(id: string, { password, version }): Promise<User | undefined> {
    return this.prisma.user
      .update({
        data: { password, version },
        where: { id },
      })
      .then(dbUserToDto);
  }

  async findOneByLogin(login: string) {
    return this.prisma.user.findFirst({ where: { login } }).then(dbUserToDto);
  }
}
