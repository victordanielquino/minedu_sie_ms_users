import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { User } from './user.entity';
import { UserRole } from './user-role.entity';

@Entity({ name: 'roles', schema: 'schema_aux' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(4)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  sigla: string;

  @Exclude()
  @MinLength(6)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 255 })
  descripcion: string;

  @Column({ type: 'boolean', default: true })
  enabled: boolean;

  @Exclude()
  @CreateDateColumn({
    name: 'create_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'update_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;

  @OneToMany(() => UserRole, (userRole) => userRole.role)
  usersRoles: UserRole;
}
