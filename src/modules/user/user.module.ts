import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role, User, UserRole } from './entities';
import { RoleService } from './services/role.service';
import { UserRoleService } from './services/user-role.service';
import { RoleController } from './controllers/role.controller';
import { UserRoleController } from './controllers/user-role.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, UserRole])],
  controllers: [UserController, RoleController, UserRoleController],
  providers: [UserService, RoleService, UserRoleService],
})
export class UserModule {}
