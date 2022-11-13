import { Users } from '@prisma/client';
import { id } from 'aws-sdk/clients/datapipeline';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';

interface IUsersRepository {
  findByEmailWithRelations(email: string): Promise<Users | null>;
  findByEmailPhoneOrCpf(email: string, phone: string, cpf: string): Promise<Users | null>;
  create(data: ICreateUserDTO): Promise<Users>;
  delete(id: string): Promise<void>;
  findById(id:string):Promise<Users | null>;
  update(data: IUpdateUserDTO): Promise<Users>
}

export default IUsersRepository;
