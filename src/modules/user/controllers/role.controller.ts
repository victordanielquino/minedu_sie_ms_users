import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { RoleService } from '../services/role.service';
import { RoleMSG } from '../../../common/enums';
import { RoleCreateDto } from '../dtos';

@Controller()
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @MessagePattern(RoleMSG.FIND_ALL)
  findAll() {
    return this._roleService.findAll();
  }

  @MessagePattern(RoleMSG.FIND_ONE)
  findOne(@Payload() id: number) {
    return this._roleService.findOne(id);
  }

  @MessagePattern(RoleMSG.CREATE)
  create(@Payload() roleDTO: RoleCreateDto) {
    return this._roleService.create(roleDTO);
  }

  @MessagePattern(RoleMSG.UPDATE)
  update(@Payload() payload: any) {
    return this._roleService.update(payload.id, payload.roleDTO);
  }

  @MessagePattern(RoleMSG.DELETE)
  delete(@Payload() id: number) {
    return this._roleService.delete(id);
  }
}
