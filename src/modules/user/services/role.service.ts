import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role, User } from '../entities';
import { Repository } from 'typeorm';
import { RoleCreateDto, RoleUpdateDto } from '../dtos';

@Injectable()
export class RoleService {
  constructor(@InjectRepository(Role) private _roleRepo: Repository<Role>) {}

  async findAll(): Promise<Role[]> {
    return await this._roleRepo.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this._roleRepo.findOneBy({ id });
  }

  async create(dto: RoleCreateDto): Promise<Role> {
    const newRole = await this._roleRepo.create(dto);
    return await this._roleRepo.save(newRole);
  }

  async update(id: number, dto: RoleUpdateDto): Promise<Role> {
    const role = await this.findOne(id);
    this._roleRepo.merge(role, dto);
    return await this._roleRepo.save(role);
  }

  async delete(id: number): Promise<any> {
    const role = await this.findOne(id);
    return await this._roleRepo.remove(role);
  }
}
