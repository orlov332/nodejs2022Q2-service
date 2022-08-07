import { Controller, Delete, Get, HttpCode, Param, ParseUUIDPipe, Post, Req } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesResponse } from './dto/favorites-response';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  getFavorites(@Req() { user: { id: userId } }): Promise<FavoritesResponse> {
    return this.favoritesService.getFavorites(userId);
  }

  @Post('track/:id')
  addTrack(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addTrack(userId, id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeTrack(userId, id);
  }

  @Post('artist/:id')
  addArtist(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addArtist(userId, id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeArtist(userId, id);
  }

  @Post('album/:id')
  addAlbum(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.addAlbum(userId, id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Req() { user: { id: userId } }, @Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeAlbum(userId, id);
  }
}
