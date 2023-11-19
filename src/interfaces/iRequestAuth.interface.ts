import User from '../models/user/iuser.interface'
import { Request } from 'express';

interface IRequestAuth extends Request
{
    user: User;    
}

export default IRequestAuth;