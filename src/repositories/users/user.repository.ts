import { IUserRepository } from "../../interfaces/repositories/users/iUserRepository.interface";
import User from "../../models/user/iuser.interface";
import { BaseFirebaseRepository } from "../baseFirebase.repository";

export class UserRepository 
extends BaseFirebaseRepository<User> implements IUserRepository {

    async getEmailVerificationAttempts(): Promise<number> {
        
        const blockedUsers = await this.ref.orderByChild
        ('emailVerificationAttempts').equalTo(5).once('value');
        const data = blockedUsers.val();
        return data ? data.emailVerificationAttempts : 0;
    }
    
    async getUserByEmail(email: string): Promise<User | undefined> {
        const snapshot = await this.ref.orderByChild('email').equalTo(email).once('value');
        const user = snapshot.val();
        return user ? Object.values(user)[0] as User : undefined;
      }    
   
}