import { IUserRepository } from '../../interfaces/repositories/users/iUserRepository.interface';
import { ICaregiverRepository } from '../../interfaces/repositories/users/iCaregiverRepository.interface';
import ICaregiver from '../../models/user/icaregiver.model';
import { PostStates } from '../../constants/animals/posts.constant';
  
class CaregiverService {

  repository:ICaregiverRepository;
  constructor(private _repository:ICaregiverRepository,
    private _userRepository:IUserRepository
  )
  {
    this.repository = _repository;
  }

  async getAll(): Promise<ICaregiver[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }


  async getById(id:any): Promise<ICaregiver | null> {

    const allItems = await this.repository.getById(id);
    return allItems;
  }

  async getByUserEmail(_userEmail:string): Promise<ICaregiver | null> {

  const user = await this._userRepository.getUserByEmail(_userEmail);

  if(!user)
    throw new Error('Usuario no encontrado');

  const c = await this.repository.getByUserId(user.id);
  return c;
  }

  async create(caregiver: ICaregiver, _userId:any): Promise<string> {
    
    const user = this._userRepository.getById(_userId);
    if(!user)
      throw new Error('Usuario no encontrado.');

    caregiver.userId = _userId;
    caregiver.state = PostStates.Published;
    const atrRef = await this.repository.create(caregiver);
    return atrRef;
  }

  async update(id: string, updates: Partial<ICaregiver>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

}
export default CaregiverService;
