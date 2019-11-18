import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Message from "./Message";
import Ride from './Ride';
import User from "./User";

@Entity("chats")
class Chat extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({ nullable: true})
  driverId: string;

  @Column({ nullable: true})
  passengerId: string;

  @Column({ nullable: true})
  rideId: string;

  @OneToMany(type => Message, message => message.chat)
  messages: Message[];

  @OneToOne(type => Ride, ride => ride.chat)
  ride: Ride

  @ManyToOne(type => User, user => user.chatAsPassenger)
  passenger: User

  @ManyToOne(type => User, user => user.chatAsDriver)
  driver: User

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Chat;
