import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { Exclude } from 'class-transformer';

import { UserRole } from './user-role.entity';

@Entity({ name: 'users', schema: 'public' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @MinLength(4)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 25, unique: true, nullable: false })
  username: string;

  @Exclude()
  @MinLength(6)
  @MaxLength(128)
  @Column({ type: 'varchar', length: 255 })
  password: string;

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

  @OneToMany(() => UserRole, (userRole) => userRole.user, { eager: true })
  usersRoles: UserRole[];
}
