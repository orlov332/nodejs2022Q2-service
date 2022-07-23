import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '../common/memory.repository';
import { User } from './entities/user.entity';

@Injectable()
export class UserRepository extends MemoryRepository<User> {}
