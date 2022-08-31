import { Controller } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserMSG } from '../../../common/enums';
import { UserCreateDto } from '../dtos';

@Controller()
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @MessagePattern(UserMSG.FIND_ALL)
  findAll() {
    return this._userService.findAll();
  }

  @MessagePattern(UserMSG.FIND_ONE)
  findOne(@Payload() id: number) {
    return this._userService.findOne(id);
  }

  @MessagePattern(UserMSG.CREATE)
  create(@Payload() useDTO: UserCreateDto) {
    return this._userService.createOne(useDTO);
  }

  @MessagePattern(UserMSG.UPDATE)
  update(@Payload() payload: any) {
    return this._userService.updateOne(payload.id, payload.userDTO);
  }

  @MessagePattern(UserMSG.DELETE)
  delete(@Payload() id: number) {
    return this._userService.deleteOne(id);
  }
}
