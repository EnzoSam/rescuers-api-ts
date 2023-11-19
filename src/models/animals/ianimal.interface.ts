import IAttribute from "../iatribute.model";

interface Animal {
    id?: string;
    name?: string;
    species?: string;
    breed?: string;
    age?: number;
    description: string;
    availableForAdoption: boolean;
    lost: boolean;
    ownerId?: string; 
    attributes?: IAttribute[];
  }
  
  export default Animal;
  