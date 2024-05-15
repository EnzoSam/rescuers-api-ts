import * as admin from 'firebase-admin';
import { IBaseRepository } from '../interfaces/repositories/irepository.interface';

export class BaseFirebaseRepository<T> implements IBaseRepository<T>{
    private db: admin.database.Database;
    private ref: admin.database.Reference;

    constructor(private path: string) {
        this.db = admin.database();
        this.ref = this.db.ref(path);
    }

    async getAll(): Promise<T[]> {
        const snapshot = await this.ref.once('value');
        const data = snapshot.val();
        return data ? Object.values(data) : [];
    }

    async getById(id: string): Promise<T | null> {
        const snapshot = await this.ref.child(id).once('value');
        const data = snapshot.val();
        return data ? data : null;
    }

    async create(data: T, id?: string): Promise<string> {
        const newItemRef = id ? this.ref.child(id) : this.ref.push();
        await newItemRef.set(data);
        return newItemRef.key || '';
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this.ref.child(id).update(data);
    }

    async delete(id: string): Promise<void> {
        await this.ref.child(id).remove();
    }
}

