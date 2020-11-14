//id username email password

import { BaseEntity, Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";

@Entity('users')
export class User extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', {length: 200, nullable: false})
  username: string;

  @Column('varchar', {length: 50, nullable: false, unique: true})
  email: string;

  @Column('varchar', {length: 250, nullable: false})
  password: string;

  @Column('varchar', {length:200, nullable: false})
  salt: string;

  @OneToOne(() => Account, acc => acc.user)
  account: Account

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}