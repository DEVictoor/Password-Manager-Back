import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Person } from "../../Person/entities/person.entity";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ default: 0, nullable: true })
  isSubscribed?: boolean;

  @OneToOne(() => Person, (p) => p.user, { nullable: false })
  @JoinColumn()
  person: Person;

  @Column()
  otp: string;

  @Column({ default: 0 })
  isVerified: boolean;

  @CreateDateColumn()
  created_at?: Date;

  @UpdateDateColumn()
  updated_at?: Date;
}
