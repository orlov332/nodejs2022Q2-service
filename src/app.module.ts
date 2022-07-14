import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), UserModule, ArtistModule, AlbumModule],
})
export class AppModule {}
