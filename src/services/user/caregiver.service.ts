import { ICaregiverRepository } from '../../interfaces/repositories/users/iCaregiverRepository.interface';
import ICaregiver from '../../models/user/icaregiver.model';
  
class CaregiverService {

  repository:ICaregiverRepository;
  constructor(_repository:ICaregiverRepository)
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

  async create(caregiver: ICaregiver): Promise<string> {
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
