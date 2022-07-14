import { Exclude } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @IsUUID('4')
  id: string; // uuid v4

  login: string;

  @Exclude()
  password: string;

  version: number; // integer number, increments on update

  createdAt: number; // timestamp of creation

  updatedAt: number; // timestamp of last update
}
