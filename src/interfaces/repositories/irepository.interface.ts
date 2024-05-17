export interface IBaseRepository<T> {
    getAll(): Promise<T[]>;    
    getById(id: string): Promise<T | null>;
    create(data: T, id?: string): Promise<string>;
    update(id: string, data: Partial<T>): Promise<void>;
    delete(id: string): Promise<void>;
}