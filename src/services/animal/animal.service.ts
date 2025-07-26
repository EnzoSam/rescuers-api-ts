import IAnimal from '../../models/animals/ianimal.interface';
import { IAnimalRepository } from '../../interfaces/repositories/rescuers/iAnimalRepository.interface';
import { IFilter } from '../../interfaces/ifilter.interface';
import { PostStates } from '../../constants/animals/posts.constant';
import { IUserRepository } from  '../../interfaces/repositories/users/iUserRepository.interface'

class AnimalService {

  repository:IAnimalRepository;
  constructor(_repository:IAnimalRepository,
    private userRepository:IUserRepository
  )
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
    
    animal.state = PostStates.PendingReview;
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

  async count(filter:IFilter | undefined):Promise<number>
  {
    const c = await this.repository.count(filter);
    return c;
  } 

  async changeState(id: string, _state:PostStates, _userId:any): Promise<void> {
    let a =  await this.getById(id);
    if(a)
    {
      
      let user = await this.userRepository.getById(_userId);
      if(a.userId === _userId || (user && user.roles.includes(2)))
      {
        a.state = _state;
        await this.update(id, a);
      }
      else{
        throw new Error('Solo puede ser modificado por el dueño.');
      }
    }
    else
    {
        throw new Error('El animal no existe.');
    }
  }
}

export default AnimalService;
