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

  async getFavorites(): Promise<FavoritesResponse> {
    const { albums, artists, tracks } = await this.repository.getFavorites();

    return {
      albums: await Promise.all(albums.map((albumId) => this.albumService.findOne(albumId))),
      artists: await Promise.all(artists.map((artistId) => this.artistService.findOne(artistId))),
      tracks: await Promise.all(tracks.map((trackId) => this.trackService.findOne(trackId))),
    };
  }

  async addTrack(id: string) {
    await this.trackService.findOne(id).catch(() => {
      throw new HttpException("Track doesn't exist", 422);
    });
    await this.repository.addTrack(id);
  }

  async removeTrack(id: string) {
    const favorites = await this.repository.getFavorites();
    if (!favorites.tracks.includes(id)) throw new NotFoundException();
    await this.repository.removeTrack(id);
  }

  async addArtist(id: string) {
    await this.artistService.findOne(id).catch(() => {
      throw new HttpException("Artist doesn't exist", 422);
    });
    await this.repository.addArtist(id);
  }

  async removeArtist(id: string) {
    const favorites = await this.repository.getFavorites();
    if (!favorites.artists.includes(id)) throw new NotFoundException();
    await this.repository.removeArtist(id);
  }

  async addAlbum(id: string) {
    await this.albumService.findOne(id).catch(() => {
      throw new HttpException("Album doesn't exist", 422);
    });
    await this.repository.addAlbum(id);
  }

  async removeAlbum(id: string) {
    const favorites = await this.repository.getFavorites();
    if (!favorites.albums.includes(id)) throw new NotFoundException();
    await this.repository.removeAlbum(id);
  }
}
