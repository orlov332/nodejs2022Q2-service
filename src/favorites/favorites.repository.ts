import { Injectable } from '@nestjs/common';
import { Favorites } from './entities/favorite.entity';

@Injectable()
export class FavoritesRepository {
  private readonly favorites = new Favorites();

  async getFavorites(): Promise<Favorites> {
    return this.favorites;
  }

  async addTrack(id: string) {
    if (!this.favorites.tracks.includes(id)) this.favorites.tracks.push(id);
  }

  async removeTrack(id: string) {
    this.favorites.tracks = this.favorites.tracks.filter((item) => item !== id);
  }

  async addArtist(id: string) {
    if (!this.favorites.artists.includes(id)) this.favorites.artists.push(id);
  }

  async removeArtist(id: string) {
    this.favorites.artists = this.favorites.artists.filter((item) => item !== id);
  }

  async addAlbum(id: string) {
    if (!this.favorites.albums.includes(id)) this.favorites.albums.push(id);
  }

  async removeAlbum(id: string) {
    this.favorites.albums = this.favorites.albums.filter((item) => item !== id);
  }
}
