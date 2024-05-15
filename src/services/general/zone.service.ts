import { IZone } from '../../models/general/izone.model';
import { IZoneRepository } from '../../interfaces/repositories/general/izoneRepository.interface';

class ZoneService {

  repository: IZoneRepository;

  constructor(_repository: IZoneRepository) {
    this.repository = _repository;
  }

  async getAll(): Promise<IZone[]> {

    const allItems = await this.repository.getAll();
    return allItems;
  }

  async create(zone: IZone): Promise<void> {
    const atrRef = await this.repository.create(zone);
  }

  async update(id: string, updates: Partial<IZone>): Promise<void> {
    await this.repository.update(id, updates);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}

export default ZoneService;
