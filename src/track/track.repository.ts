import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '../common/memory.repository';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository extends MemoryRepository<Track> {}
