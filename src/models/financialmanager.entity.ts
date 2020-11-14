//id username email password

import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('financialmanager')
export class FinancialManager extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User)
  user: User
  
  @Column('varchar', {length: 200, nullable: false})
  description: string;

  @Column('integer', {nullable: false})
  type: number;

  @Column('decimal', {precision: 10, scale: 2})
  amount: number;

  @Column('date', {nullable: true})
  createdTransaction: Date;

  @CreateDateColumn()
  createdAt: Date;

  
  @UpdateDateColumn()
  updateAt: Date;

}