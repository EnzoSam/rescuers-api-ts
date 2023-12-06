interface User {
    id: number;
    name: string;
    lastName: string;
    email: string;
    password: string;
    contactInfo: {
      phone?: string;
      address?: string;
    };
    isCaregiver: boolean;
    rating?: number;
    roles: string[];
    emailConfirmed: boolean;
    emailConfirmationToken?: string;
    emailVerificationAttempts: number;
  }
  
  export default User;
  