//id username email password

import { BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('accounts')
export class Account extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: string;

  @Column('varchar', {length: 200, nullable: false})
  type: string;

  @Column('varchar', {length: 200, nullable: false})
  name: string;

  @Column('numeric')
  balance: number;

  @OneToOne(() => User, user => user.account)
  user: User

  

}