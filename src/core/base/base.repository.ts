export default interface BaseRepository<T> {
  create(entity: T): Promise<T>;
  update(id: number, entity: T): Promise<T | null>;
  delete(id: number): Promise<T | null>;
  findById(id: number): Promise<T | null>;
}
