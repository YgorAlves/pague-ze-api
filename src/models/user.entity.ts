//id username email password

import { BaseEntity, BeforeInsert, Column, CreateDateColumn, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Account } from "./account.entity";
import * as bcrypt from 'bcrypt'

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

  @OneToMany(() => Account, acc => acc.user)
  account: Account[]

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }
}