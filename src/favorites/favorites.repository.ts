import { forwardRef, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FavoritesResponse } from './dto/favorites-response';

@Injectable()
export class FavoritesRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
  ) {}

  // FIXME: Take current user from JWT
  private readonly userId = 'c3190809-84ad-4eeb-8d2a-6be59da588f9';

  private async getCurrentUser() {
    let user = await this.prisma.user.findUnique({
      where: { id: this.userId },
    });
    // FIXME: Remove me once authorization has done
    if (!user) {
      user = await this.prisma.user.create({
        data: {
          id: this.userId,
          login: 'current_user',
          password: 'secret',
          version: 1,
        },
      });
    }
    return user;
  }

  async getFavorites(): Promise<FavoritesResponse> {
    const user = await this.getCurrentUser();
    return await this.prisma.user
      .findUnique({
        where: { id: user.id },
        select: {
          favArtists: true,
          favAlbums: true,
          favTracks: true,
        },
      })
      .then((user) => ({
        artists: user.favArtists,
        albums: user.favAlbums,
        tracks: user.favTracks,
      }));
  }

  private async addFavorite(favorite: string, id: string) {
    const user = await this.getCurrentUser();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        [favorite]: {
          connect: { id },
        },
      },
    });
  }

  private async removeFavorite(favorite: string, id: string) {
    const user = await this.getCurrentUser();
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        [favorite]: {
          disconnect: { id },
        },
      },
    });
  }

  private async getFavoriteIds(favorite: string): Promise<string[]> {
    const user = await this.getCurrentUser();
    return await this.prisma.user
      .findUnique({
        where: { id: user.id },
        select: {
          [favorite]: { select: { id: true } },
        },
      })
      .then((user) => user[favorite].map((fav) => fav.id));
  }

  async addTrack(id: string) {
    return this.addFavorite('favTracks', id);
    // if (!this.favorites.tracks.includes(id)) this.favorites.tracks.push(id);
  }

  async removeTrack(id: string) {
    return this.removeFavorite('favTracks', id);
  }

  async addArtist(id: string) {
    const favorites = await this.getFavoriteArtistIds();
    if (!favorites.includes(id)) await this.addFavorite('favArtists', id);
  }

  async removeArtist(id: string) {
    return this.removeFavorite('favArtists', id);
  }

  async addAlbum(id: string) {
    const favorites = await this.getFavoriteAlbumIds();
    if (!favorites.includes(id)) await this.addFavorite('favAlbums', id);
  }

  async removeAlbum(id: string) {
    return this.removeFavorite('favAlbums', id);
  }

  async getFavoriteTrackIds(): Promise<string[]> {
    return await this.getFavoriteIds('favTracks');
  }

  async getFavoriteArtistIds(): Promise<string[]> {
    return await this.getFavoriteIds('favArtists');
  }

  async getFavoriteAlbumIds(): Promise<string[]> {
    return await this.getFavoriteIds('favAlbums');
  }
}
