import { IUserRepository } from "../../interfaces/repositories/users/iUserRepository.interface";
import User from "../../models/user/iuser.interface";
import { BaseFirestoreRepository } from "../baseFirestore.repository";

export class UserRepository
    extends BaseFirestoreRepository<User> implements IUserRepository {

    async getEmailVerificationAttempts(): Promise<number> {
        const snapshot = await this.collection.where('emailVerificationAttempts', '==', 5).get();
        let count = 0;
        snapshot.forEach(doc => {
            if (doc.exists && doc.data().emailVerificationAttempts === 5) {
                count++;
            }
        });
        return count;
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        const snapshot = await this.collection.where('email', '==', email).get();
        let user: User | undefined = undefined;
        snapshot.forEach(doc => {
            if (doc.exists) {
                user = doc.data() as User;
                user.id = doc.id;
                return;
            }
        });
        return user;
    }

}