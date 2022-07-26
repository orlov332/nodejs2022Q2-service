import { Album } from './entities/album.entity';
import { PrismaRepository } from '../common/prisma.repository';
import { PrismaService } from '../prisma/prisma.service';
import { forwardRef, Inject } from '@nestjs/common';

export class AlbumRepository extends PrismaRepository<Album> {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    prisma: PrismaService,
  ) {
    super(prisma, 'album');
  }
}
