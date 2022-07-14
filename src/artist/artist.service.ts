import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistRepository } from './artist.repository';
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {
  constructor(private readonly repository: ArtistRepository) {}

  create(createArtistDto: CreateArtistDto) {
    return this.repository.create(createArtistDto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const obj = await this.repository.findOne(id);
    if (!obj) throw new NotFoundException();
    return obj;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    const artist = await this.repository.findOne(id);
    if (artist) {
      const updateObj = new Artist(artist);
      Object.assign(updateObj, updateArtistDto);
      return await this.repository.update(id, updateObj);
    } else throw new NotFoundException();
  }

  async remove(id: string) {
    const deleted = await this.repository.remove(id);
    if (deleted) return deleted;
    else throw new NotFoundException();
  }
}
