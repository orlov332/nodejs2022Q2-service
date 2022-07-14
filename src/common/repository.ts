export interface IRepository<TEntity extends { id: string }, TCreateDto, TUpdateDto> {
  create(createObj: TCreateDto): Promise<TEntity>;

  findAll(): Promise<TEntity[]>;

  findOne(id: string): Promise<TEntity | undefined>;

  update(id: string, updateObj: TUpdateDto): Promise<TEntity | undefined>;

  remove(id: string): Promise<number>;
}
