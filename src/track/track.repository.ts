import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Track } from './entities/track.entity';
import { PrismaRepository } from '../common/prisma.repository';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TrackRepository extends PrismaRepository<Track> {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    prisma: PrismaService,
  ) {
    super(prisma, 'track');
  }

  removeArtistRef(artistId: string) {
    this.prisma.track.updateMany({
      data: { artistId: null },
      where: { artistId },
    });
  }

  removeAlbumRef(albumId: string) {
    this.prisma.track.updateMany({
      data: { albumId: null },
      where: { albumId },
    });
  }
}
