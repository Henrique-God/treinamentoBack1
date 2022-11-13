import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import FindUserService from '@modules/users/services/FindUserService';

export default class UserController {
  public async create(req: Request, res: Response): Promise<Response> {
    const {
      name,
      email,
      cpf,
      phone,
      password,
    } = req.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      cpf,
      phone,
      password,
    });

    user.password = '###';

    return res.status(201).json(user);
  }
  public async delete(req: Request, res: Response): Promise<Response>{
    const{
      id
    }=req.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute({id});
    return res.json({sucess: true});
  }

  public async update(req: Request, res: Response): Promise<Response>{
    const{
      cpf,
      email,
      name,
      phone
    }=req.body;
    const{
      id
    }=req.params;
    const updateUser = container.resolve(UpdateUserService);
    const updatedUser = await updateUser.execute({id, cpf, name, phone, email});
    
    return res.json(updatedUser);
  }
  public async findUser(req: Request, res: Response): Promise<Response>{
    const{
      id
    }=req.params;
    const user = container.resolve(FindUserService);
    const findedUser = await user.execute({id});

    return res.json(findedUser);
  }
}