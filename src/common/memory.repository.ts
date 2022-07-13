import { v4 as uuid4 } from 'uuid';

export class MemoryRepository<TEntity extends { id: string }> {
  protected data: TEntity[] = [];

  async create(createObj: Omit<TEntity, 'id'>): Promise<TEntity> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const newObj: TEntity = {
      id: uuid4(),
      ...createObj,
    };
    this.data.push(newObj);
    return newObj;
  }

  async findAll(): Promise<TEntity[]> {
    return this.data;
  }

  async findOne(id: string): Promise<TEntity | undefined> {
    return this.data.find((u) => u.id === id);
  }

  async update(id: string, updateObj: Partial<Omit<TEntity, 'id'>>): Promise<TEntity | undefined> {
    const obj = await this.findOne(id);
    if (obj) Object.assign(obj, updateObj);
    return obj;
  }

  async remove(id: string): Promise<number> {
    const size = this.data.length;
    this.data = this.data.filter((u) => u.id !== id);
    return size - this.data.length;
  }
}
