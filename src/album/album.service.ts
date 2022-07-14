import { Injectable } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { RestService } from '../common/rest.service';
import { Album } from './entities/album.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class AlbumService extends RestService<Album> {
  constructor(repository: AlbumRepository, private readonly trackService: TrackService) {
    super(repository);
  }

  async remove(id: string): Promise<number> {
    this.trackService.removeAlbumRef(id);
    return super.remove(id);
  }
}
