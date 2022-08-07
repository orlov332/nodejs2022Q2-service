import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { FavoritesResponse } from './dto/favorites-response';

@Injectable()
export class FavoritesRepository {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    private readonly prisma: PrismaService,
  ) {}

  private async getCurrentUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) throw new Error(`User with id ${userId} not found in Data Base`);
    return user;
  }

  async getFavorites(userId: string): Promise<FavoritesResponse> {
    const user = await this.getCurrentUser(userId);
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

  private async addFavorite(userId: string, favorite: string, id: string) {
    const user = await this.getCurrentUser(userId);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        [favorite]: {
          connect: { id },
        },
      },
    });
  }

  private async removeFavorite(userId: string, favorite: string, id: string) {
    const user = await this.getCurrentUser(userId);
    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        [favorite]: {
          disconnect: { id },
        },
      },
    });
  }

  private async getFavoriteIds(userId: string, favorite: string): Promise<string[]> {
    const user = await this.getCurrentUser(userId);
    return await this.prisma.user
      .findUnique({
        where: { id: user.id },
        select: {
          [favorite]: { select: { id: true } },
        },
      })
      .then((user) => user[favorite].map((fav) => fav.id));
  }

  async addTrack(userId: string, id: string) {
    return this.addFavorite(userId, 'favTracks', id);
  }

  async removeTrack(userId: string, id: string) {
    return this.removeFavorite(userId, 'favTracks', id);
  }

  async addArtist(userId: string, id: string) {
    const favorites = await this.getFavoriteArtistIds(userId);
    if (!favorites.includes(id)) await this.addFavorite(userId, 'favArtists', id);
  }

  async removeArtist(userId: string, id: string) {
    return this.removeFavorite(userId, 'favArtists', id);
  }

  async addAlbum(userId: string, id: string) {
    const favorites = await this.getFavoriteAlbumIds(userId);
    if (!favorites.includes(id)) await this.addFavorite(userId, 'favAlbums', id);
  }

  async removeAlbum(userId: string, id: string) {
    return this.removeFavorite(userId, 'favAlbums', id);
  }

  async getFavoriteTrackIds(userId: string): Promise<string[]> {
    return await this.getFavoriteIds(userId, 'favTracks');
  }

  async getFavoriteArtistIds(userId: string): Promise<string[]> {
    return await this.getFavoriteIds(userId, 'favArtists');
  }

  async getFavoriteAlbumIds(userId: string): Promise<string[]> {
    return await this.getFavoriteIds(userId, 'favAlbums');
  }
}
