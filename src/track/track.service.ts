import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { RestService } from '../common/rest.service';
import { Track } from './entities/track.entity';
import { TrackRepository } from './track.repository';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService extends RestService<Track> {
  constructor(
    protected readonly repository: TrackRepository,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {
    super(repository);
  }

  async removeWithFav(userId: string, id: string): Promise<number> {
    await this.favoritesService.removeTrack(userId, id).catch((err) => {
      if (!(err instanceof NotFoundException)) throw err;
    });
    return await super.remove(id);
  }

  removeArtistRef(artistId: string) {
    this.repository.removeArtistRef(artistId);
  }

  removeAlbumRef(albumId: string) {
    this.repository.removeAlbumRef(albumId);
  }
}
