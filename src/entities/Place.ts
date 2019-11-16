import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import User from "./User";


@Entity("places")
class Place extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "double precision", default: 0 })
  log: number;

  @Column({ type: "double precision", default: 0 })
  lat: number;

  @Column({ type: "text" })
  address: string;

  @Column({ nullable: true })
  userId: string;

  @ManyToOne(type => User, user => user.places)
  user:User

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Place;
