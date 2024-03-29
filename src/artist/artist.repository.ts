import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Artist } from './entities/artist.entity';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaRepository } from '../common/prisma.repository';

@Injectable()
export class ArtistRepository extends PrismaRepository<Artist> {
  constructor(
    @Inject(forwardRef(() => PrismaService))
    prisma: PrismaService,
  ) {
    super(prisma, 'artist');
  }
}
