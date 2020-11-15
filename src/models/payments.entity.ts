import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('payments')
export class Payments extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User)
  sender: User;

  @ManyToOne(() => User)
  recipient: User

  @Column('varchar', {length: 250, nullable: true})
  recipientAux: string;

  @Column('varchar')
  type: 'purchase' | 'sell' | 'transfer' | 'loterica' | 'p2p' | 'deposit' | 'pix' | 'qrcode';

  @Column('varchar', {nullable: true})
  status: 'pending' | 'approved' | 'canceled';

  @Column('varchar', {length: 255, nullable: true})
  description: string;

  @Column('decimal', {precision: 10, scale: 2})
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}