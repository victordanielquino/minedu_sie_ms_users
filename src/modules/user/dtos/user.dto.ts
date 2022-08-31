import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsPositive,
  Length,
  IsEnum,
  IsBoolean,
  IsArray,
} from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

/*import { EnumToString } from '../../../helpers/enumToString';
import { RoleEnum, StateEnum } from '../../../shared/enums';*/

export class UserReadDto {
  readonly username: string;
  readonly password: string;
  readonly enabled: boolean;

  /*@IsEnum(StateEnum, {
    message: `Opcion invalida. Se esperaba: ${EnumToString(StateEnum)}`,
    each: true,
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum;*/
  /*
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly rolesIds: number[];*/
}

export class UserCreateDto {
  readonly username: string;
  readonly password: string;
  readonly enabled: boolean;

  /*@IsEnum(StateEnum, {
    message: `Opcion invalida. Se esperaba: ${EnumToString(StateEnum)}`,
    each: true,
  })
  @IsNotEmpty()
  @ApiProperty()
  readonly state: StateEnum;*/
  /*
  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  readonly rolesIds: number[];*/
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
