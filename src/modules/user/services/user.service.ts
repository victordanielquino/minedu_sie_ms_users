import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';

import { User } from '../../../common/entities/user.entity';
import { UserCreateDto, UserUpdateDto } from '../dtos';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private _userRepo: Repository<User>) {}

  async findAll() {
    return await this._userRepo.find();
  }

  async findOne(id: number): Promise<User> {
    return await this._userRepo.findOneBy({ id });
  }

  async createOne(dto: UserCreateDto): Promise<User> {
    const existUser = await this._userRepo.findOneBy({
      username: dto.username,
    });
    if (existUser) throw new BadRequestException(`EL usuario ya exite.`);
    const newUser = await this._userRepo.create(dto);
    const user = await this._userRepo.save(newUser);
    delete user.password;
    return user;
  }

  async updateOne(id: number, dto: UserUpdateDto): Promise<User> {
    const user = await this.findOne(id);
    this._userRepo.merge(user, dto);
    return await this._userRepo.save(user);
  }

  async deleteOne(id: number) {
    const user = await this.findOne(id);
    return await this._userRepo.remove(user);
  }

  async getOneWithUsername(username: string) {
    return await this._userRepo.findOne({
      where: { username },
    });
  }
}
