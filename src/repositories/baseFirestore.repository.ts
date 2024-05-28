import * as admin from 'firebase-admin';
import { IBaseRepository } from '../interfaces/repositories/irepository.interface';

export class BaseFirestoreRepository<T extends { [x: string]: any }> implements IBaseRepository<T> {
    protected db: admin.firestore.Firestore;
    protected collection: admin.firestore.CollectionReference;

    constructor(private path: string) {
        this.db = admin.firestore();
        this.collection = this.db.collection(path);
    }

    async getAll(): Promise<T[]> {
        const snapshot = await this.collection.get();
        const arr:T[] = [];
        snapshot.forEach(doc => {
            let d:T = doc.data() as T;
            (d.id as any) = doc.id;
            arr.push(d);
          });

        return arr;
    }

    async getById(id: string): Promise<T | null> {
        const doc = await this.collection.doc(id).get();
        let r = doc.exists ? (doc.data() as T) : null;

        if(r)
            (r as any).id = doc.id
        
        return r;
    }

    async create(data: T, id?: string): Promise<string> {
        if (id) {
            await this.collection.doc(id).set(data);
            return id;
        } else {
            const docRef = await this.collection.add(data);
            (data.id as any) = docRef.id;
            return docRef.id;
        }
    }

    async update(id: string, data: Partial<T>): Promise<void> {
        await this.collection.doc(id).update(data);
    }

    async delete(id: string): Promise<void> {
        await this.collection.doc(id).delete();
    }
}