import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { RestService } from '../common/rest.service';
import { Artist } from './entities/artist.entity';
import { TrackService } from '../track/track.service';

@Injectable()
export class ArtistService extends RestService<Artist> {
  constructor(repository: ArtistRepository, private readonly trackService: TrackService) {
    super(repository);
  }

  async remove(id: string): Promise<number> {
    this.trackService.removeArtistRef(id);
    return super.remove(id);
  }
}
