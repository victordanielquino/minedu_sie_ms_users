import { PartialType } from '@nestjs/swagger';

export class RoleReadDto {
  readonly id: number;
  readonly sigla: string;
  readonly descripcion: string;
  readonly enabled: boolean;
}

export class RoleCreateDto {
  readonly sigla: string;
  readonly descripcion: string;
  readonly enabled: boolean;
}

export class RoleUpdateDto extends PartialType(RoleCreateDto) {}
