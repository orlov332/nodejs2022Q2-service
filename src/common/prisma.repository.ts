import { IRepository } from './repository';
import { PrismaService } from '../prisma/prisma.service';

export class PrismaRepository<
  TEntity extends { id: string },
  TCreateDto = Omit<TEntity, 'id'>,
  TUpdateDto = Partial<Omit<TEntity, 'id'>>,
> implements IRepository<TEntity, TCreateDto, TUpdateDto>
{
  constructor(private readonly prisma: PrismaService, private readonly entityName: string) {}

  async create(createObj: TCreateDto): Promise<TEntity> {
    return this.prisma[this.entityName].create({ data: createObj });
  }

  async findAll(): Promise<TEntity[]> {
    return this.prisma[this.entityName].findMany();
  }

  async findOne(id: string): Promise<TEntity | undefined> {
    return this.prisma[this.entityName].findUnique({
      where: { id },
    });
  }

  async update(id: string, updateObj: TUpdateDto): Promise<TEntity | undefined> {
    return this.prisma[this.entityName].update({
      data: updateObj,
      where: { id },
    });
  }

  async remove(id: string): Promise<number> {
    return this.prisma[this.entityName]
      .delete({
        where: { id },
      })
      .then(() => 1)
      .catch(() => 0);
  }
}
