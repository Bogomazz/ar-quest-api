import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Quest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'creator_id'
  })
  creatorId: number;

}