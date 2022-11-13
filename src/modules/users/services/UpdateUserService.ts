import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';


interface IRequest {
    id: string;
    name: string;
    email: string;
    cpf: string;
    phone: string;
}
@injectable()

export default class UpdateUserService{
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}

    public async execute({
        id, name, cpf, email, phone
    }:IRequest): Promise<Users>{
        const user = await this.usersRepository.findById(id);
        if(!user){
            throw new AppError("User doesn't exist!", 404);
        }
        const updatedUser = await this.usersRepository.update({
            id,
            cpf,
            email,
            phone,
            name
        });
        return updatedUser; 
    }
}