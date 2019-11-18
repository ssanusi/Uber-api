import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { statusType } from "./../types/types.d";
import Chat from './Chat';
import User from "./User";

@Entity("rides")
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "CANCELED", "TRANSIT", "REQUESTING", "FINISHED"],
    default: "REQUESTING"
  })
  status: statusType;

  @Column({ type: "text" })
  pickupAddress: string;

  @Column({ type: "double precision" })
  pickupLog: number;

  @Column({ type: "double precision" })
  pickupLat: number;

  @Column({ type: "text" })
  dropOffAddress: string;

  @Column({ type: "double precision" })
  dropOffLog: number;

  @Column({ type: "double precision" })
  dropOffLat: number;

  @Column({ nullable: true})
  driverId: string;

  @Column({ nullable: true})
  passengerId: string;

  @Column({ type: "double precision" })
  price: number;

  @Column({ type: "text" })
  duration: string;

  @ManyToOne(type => User, user => user.rideAsPassenger)
  passenger: User;

  @ManyToOne(type => User, user => user.rideAsDriver)
  driver: User;

  @OneToOne(type => Chat, chat => chat.ride, { nullable: true })
  @JoinColumn()
  chat: Chat;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Ride;
