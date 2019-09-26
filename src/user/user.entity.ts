import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

// TODO: add constraints
@Entity()
export class User {

  @PrimaryGeneratedColumn()
  id?: number;

  @Column({
    unique: true
  })
  email: string;

  @Column()
  salt: string;

  @Column()
  hash: string;

  @Column()
  name: string;

  @Column({
    unique: true
  })
  nick: string
}