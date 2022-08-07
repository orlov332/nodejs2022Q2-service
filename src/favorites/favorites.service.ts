import { forwardRef, HttpException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FavoritesRepository } from './favorites.repository';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';
import { FavoritesResponse } from './dto/favorites-response';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly repository: FavoritesRepository,
    @Inject(forwardRef(() => TrackService))
    private readonly trackService: TrackService,
    @Inject(forwardRef(() => AlbumService))
    private readonly albumService: AlbumService,
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
  ) {}

  async getFavorites(userId: string): Promise<FavoritesResponse> {
    return this.repository.getFavorites(userId);
  }

  async addTrack(userId: string, trackId: string) {
    await this.trackService.findOne(trackId).catch(() => {
      throw new HttpException("Track doesn't exist", 422);
    });
    await this.repository.addTrack(userId, trackId);
  }

  async removeTrack(userId: string, trackId: string) {
    const favorites = await this.repository.getFavoriteTrackIds(userId);
    if (!favorites.includes(trackId)) throw new NotFoundException();
    await this.repository.removeTrack(userId, trackId);
  }

  async addArtist(userId: string, artistId: string) {
    await this.artistService.findOne(artistId).catch(() => {
      throw new HttpException("Artist doesn't exist", 422);
    });
    await this.repository.addArtist(userId, artistId);
  }

  async removeArtist(userId: string, artistId: string) {
    const favorites = await this.repository.getFavoriteArtistIds(userId);
    if (!favorites.includes(artistId)) throw new NotFoundException();
    await this.repository.removeArtist(userId, artistId);
  }

  async addAlbum(userId: string, albumId: string) {
    await this.albumService.findOne(albumId).catch(() => {
      throw new HttpException("Album doesn't exist", 422);
    });
    await this.repository.addAlbum(userId, albumId);
  }

  async removeAlbum(userId: string, albumId: string) {
    const favorites = await this.repository.getFavoriteAlbumIds(userId);
    if (!favorites.includes(albumId)) throw new NotFoundException();
    await this.repository.removeAlbum(userId, albumId);
  }
}
