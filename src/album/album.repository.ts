import { MemoryRepository } from '../common/memory.repository';
import { Album } from './entities/album.entity';

export class AlbumRepository extends MemoryRepository<Album> {}
