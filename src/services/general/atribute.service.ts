import IAttribute from '../../models/general/iatribute.model';
import { IAtributeRepository } from '../../interfaces/repositories/general/iAtributeRepository.interface';

class AtributeService {

  repository:IAtributeRepository;
  constructor(_repository:IAtributeRepository)
  {
    this.repository = _repository;
  }

  async getAll(): Promise<IAttribute[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }

  async getByGroup(group:string): Promise<IAttribute[]> {

    const allItems = await this.repository.getByGroup(group);
    return allItems;
  }

  async getById(id:any): Promise<IAttribute | null> {

    const allItems = await this.repository.getById(id);
    return allItems;
  }

  async create(zone: IAttribute): Promise<void> {
    const atrRef = await this.repository.create(zone);
  }

  async update(id: string, updates: Partial<IAttribute>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
    
}

export default AtributeService;
