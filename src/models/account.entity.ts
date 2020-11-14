//id username email password

import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('accounts')
export class Account extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', {length: 200, nullable: false})
  type: string;

  @Column('varchar', {length: 200, nullable: false})
  name: string;

  @Column('decimal', {precision: 10, scale: 2})
  balance: number;

  // @OneToOne(() => User, user => user.account)
  // user: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}