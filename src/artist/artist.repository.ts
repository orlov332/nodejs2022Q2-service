import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '../common/memory.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistRepository extends MemoryRepository<Artist> {}
