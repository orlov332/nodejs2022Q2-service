import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '../common/memory.repository';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistRepository extends MemoryRepository<Artist> {}
