import { Injectable } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { RestService } from '../common/rest.service';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService extends RestService<Artist> {
  constructor(repository: ArtistRepository) {
    super(repository);
  }
}
