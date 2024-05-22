import IAnimal from '../../models/animals/ianimal.interface';
import { IAnimalRepository } from '../../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { IFilter } from '../../interfaces/ifilter.interface';

class AnimalService {

  repository:IAnimalRepository;
  constructor(_repository:IAnimalRepository)
  {
    this.repository = _repository;
  }


  async getAll(): Promise<IAnimal[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }


  async getById(id:any): Promise<IAnimal | null> {

    const allItems = await this.repository.getById(id);
    return allItems;
  }

  async create(animal: IAnimal): Promise<string> {
    const atrRef = await this.repository.create(animal);
    return atrRef;
  }

  async update(id: string, updates: Partial<IAnimal>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async filter(filter:IFilter | undefined):Promise<IAnimal[]>
  {
    const allItems = await this.repository.filter(filter);
    return allItems;
  }  
}

export default AnimalService;
