import { Injectable } from '@nestjs/common';
import { RestService } from '../common/rest.service';
import { Track } from './entities/track.entity';
import { TrackRepository } from './track.repository';

@Injectable()
export class TrackService extends RestService<Track> {
  constructor(repository: TrackRepository) {
    super(repository);
  }
}
