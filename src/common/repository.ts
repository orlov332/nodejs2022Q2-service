export interface IRepository<
  TEntity extends { id: string },
  TCreateDto = Omit<TEntity, 'id'>,
  TUpdateDto = Partial<Omit<TEntity, 'id'>>,
> {
  create(createObj: TCreateDto): Promise<TEntity>;

  findAll(): Promise<TEntity[]>;

  findOne(id: string): Promise<TEntity | undefined>;

  update(id: string, updateObj: TUpdateDto): Promise<TEntity | undefined>;

  remove(id: string): Promise<number>;
}
