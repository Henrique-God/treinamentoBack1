import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest{
    id: string
}

@injectable()

export default class DeleteUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({
        id 
    }:IRequest): Promise<void>{
        const user = await this.usersRepository.findById(id);
        if(!user){
            throw new AppError("User doesn't exist!", 404);
        }    
        await this.usersRepository.delete(id);
    }
}
