import { Injectable } from '@nestjs/common';
import { MemoryRepository } from '../common/memory.repository';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackRepository extends MemoryRepository<Track> {
  removeArtistRef(artistId: string) {
    this.data.forEach((track) => {
      if (track.artistId === artistId) track.artistId = null;
    });
  }

  removeAlbumRef(albumId: string) {
    this.data.forEach((track) => {
      if (track.albumId === albumId) track.albumId = null;
    });
  }
}
