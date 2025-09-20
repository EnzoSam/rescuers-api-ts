import { IRefreshToken } from "../../models/user/irefresh-token.model";
import { BaseFirestoreRepository } from "../baseFirestore.repository";
import { IRefreshTokenRepository } from "../../interfaces/repositories/users/irefresh-token-repository.interface";

export class RefreshTokenrRepository
    extends BaseFirestoreRepository<IRefreshToken> implements IRefreshTokenRepository {
    async getByToken(token: string): Promise<IRefreshToken | undefined> {
        const snapshot = 
        await this.collection.where('token', '==', token).get();
        let refreshToken: IRefreshToken | undefined = undefined;
        snapshot.forEach(doc => {
            if (doc.exists) {
                refreshToken = doc.data() as IRefreshToken;
                refreshToken.id = doc.id;
                return;
            }
        });
        return refreshToken;
    }

    async deleteByToken(token: string): Promise<void> {
        const refreshToken = await this.getByToken(token)
        await this.delete(refreshToken.id);
    }

}