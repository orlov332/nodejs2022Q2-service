import { NotFoundException } from '@nestjs/common';
import { IRepository } from './repository';

export class RestService<
  TEntity extends { id: string },
  TCreateDto = Omit<TEntity, 'id'>,
  TUpdateDto = Partial<Omit<TEntity, 'id'>>,
> {
  constructor(protected readonly repository: IRepository<TEntity, TCreateDto, TUpdateDto>) {}

  create(createDto: TCreateDto): Promise<TEntity> {
    return this.repository.create(createDto);
  }

  findAll(): Promise<TEntity[]> {
    return this.repository.findAll();
  }

  async findOne(id: string): Promise<TEntity> {
    const obj = await this.repository.findOne(id);
    if (!obj) throw new NotFoundException();
    return obj;
  }

  async update(id: string, updateDto: TUpdateDto): Promise<TEntity> {
    const obj = await this.repository.findOne(id);
    if (obj) {
      return await this.repository.update(id, { ...obj, ...updateDto });
    } else throw new NotFoundException();
  }

  async remove(id: string): Promise<number> {
    const deleted = await this.repository.remove(id);
    if (deleted) return deleted;
    else throw new NotFoundException();
  }
}
