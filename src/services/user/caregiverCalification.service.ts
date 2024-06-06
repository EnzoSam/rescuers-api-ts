import { ICaregiverCalificationRepository } from '../../interfaces/repositories/users/iCaregiverCalificationRepository.interface';
import ICaregiverCalification from '../../models/user/caregiverCalification.model';
  
class CaregiverCalificationService {

  repository:ICaregiverCalificationRepository;
  constructor(_repository:ICaregiverCalificationRepository)
  {
    this.repository = _repository;
  }

  async getAll(): Promise<ICaregiverCalification[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }


  async getById(id:any): Promise<ICaregiverCalification | null> {

    const allItems = await this.repository.getById(id);
    return allItems;
  }

  async create(calification: ICaregiverCalification): Promise<string> {
    const atrRef = await this.repository.create(calification);
    return atrRef;
  }

  async update(id: string, updates: Partial<ICaregiverCalification>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async getByCaregiver(caregiverId:string, lasts:number | undefined): Promise<ICaregiverCalification[]> {

    const allItems = await this.repository.getByCaregiver(caregiverId, lasts);
    return allItems;
  }

}
export default CaregiverCalificationService;
