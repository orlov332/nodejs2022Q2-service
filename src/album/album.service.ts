import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { RestService } from '../common/rest.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService extends RestService<Album> {
  constructor(repository: AlbumRepository) {
    super(repository);
  }
}
