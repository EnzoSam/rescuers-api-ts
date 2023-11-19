interface IPost {
    id?: string;
    contenido: string;
    autorId: string;
    fechaCreacion?: string; 
    animalId?: string | null;
  }
  
  export default IPost;
  