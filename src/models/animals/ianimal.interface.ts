import IAnimalAttribute from "./ianimalAtribute.interface";

interface Animal {
    id?: string
    name: string
    datebird:Date
    description: string
    availableForAdoption: boolean
    lost: boolean
    ownerId: string
    attributes: IAnimalAttribute[];
  }
  
  export default Animal;
  