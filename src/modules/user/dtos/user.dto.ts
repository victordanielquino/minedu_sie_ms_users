import { PartialType } from '@nestjs/swagger';

export class UserReadDto {
  readonly id: number;
  readonly username: string;
  readonly password: string;
  readonly enabled: boolean;
}

export class UserCreateDto {
  readonly username: string;
  readonly password: string;
  readonly enabled: boolean;
}

export class UserUpdateDto extends PartialType(UserCreateDto) {}
