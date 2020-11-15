import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('contacts')
export class Contacts extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  // @Column('varchar', { length: 250 })
  // name: string;
  
  // @Column('varchar', { length: 250 })
  // description: string;

  // @Column('varchar', {length: 50})
  // email: string;

  // @Column('varchar', {length: 150})
  // photo: string;

  @ManyToOne(() => User, user => user.contacts)
  user: User

  @ManyToOne(() => User, user => user.contacts)
  contact: User

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updateAt: Date;
}