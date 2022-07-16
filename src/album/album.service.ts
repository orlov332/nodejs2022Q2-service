import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { AlbumRepository } from './album.repository';
import { RestService } from '../common/rest.service';
import { Album } from './entities/album.entity';
import { TrackService } from '../track/track.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService extends RestService<Album> {
  constructor(
    repository: AlbumRepository,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
  ) {
    super(repository);
  }

  async remove(id: string): Promise<number> {
    await this.favoritesService.removeAlbum(id).catch((err) => {
      if (!(err instanceof NotFoundException)) throw err;
    });
    await this.trackService.removeAlbumRef(id);
    return await super.remove(id);
  }
}
