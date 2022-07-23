import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArtistRepository } from './artist.repository';
import { RestService } from '../common/rest.service';
import { Artist } from './entities/artist.entity';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class ArtistService extends RestService<Artist> {
  constructor(
    repository: ArtistRepository,
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {
    super(repository);
  }

  async remove(id: string): Promise<number> {
    await this.favoritesService.removeArtist(id).catch((err) => {
      if (!(err instanceof NotFoundException)) throw err;
    });
    await this.trackService.removeArtistRef(id);
    return await super.remove(id);
  }
}
