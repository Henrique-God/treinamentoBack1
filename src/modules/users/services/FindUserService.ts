import { Users } from '@prisma/client';
import AppError from '@shared/errors/AppError';
import { response } from 'express';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequest{
    id: string
}

@injectable()

export default class FindUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ){}
    public async execute({
        id
    }:IRequest): Promise<Users | null>{
        const user = this.usersRepository.findById(id);
        if(!user){
            throw new AppError("This user doesn't exist!", 404);
        }
        return user;
    }
}