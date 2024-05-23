import { IUsefulDataRepository } from '../../interfaces/repositories/general/iusefulData.interface';
import { IUsefulData } from '../../models/general/iusefulData.model';

class UsefulDataService {

  constructor(private _repository:IUsefulDataRepository)
  {
  }

  async getAll(): Promise<IUsefulData[]> {

    const allItems = await this._repository.getAll();
    return allItems;
  }

  async getById(id:any): Promise<IUsefulData | null> {

    const allItems = await this._repository.getById(id);
    return allItems;
  }

  async create(zone: IUsefulData): Promise<void> {
    const atrRef = await this._repository.create(zone);
  }

  async update(id: string, updates: Partial<IUsefulData>): Promise<void> {
    await this._repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this._repository.delete(id);
  }
    
}

export default UsefulDataService;
