import bcrypt from "bcrypt";
import { IsEmail, Length } from "class-validator";

import {
  AfterLoad,
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import Chat from "./Chat";
import Message from "./Message";
import Place from "./Place";
import Ride from "./Ride";

const BCRYPT_ROUNDS = 10;

@Entity("users")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  private temPassword: string;

  @Column({ type: "text" })
  @Length(3, 20)
  firstName: string;

  @Column({ type: "text" })
  @Length(3, 20)
  lastName: string;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "text", unique: true })
  @IsEmail()
  email: string;

  @Column({ type: "boolean", default: false })
  verifiedEmail: boolean;

  @Column({ type: "text", nullable: true })
  password: string;

  @Column({ type: "text", nullable: true })
  phoneNumber: string;

  @Column({ type: "boolean", default: false })
  verifiedPhoneNumber: boolean;

  @Column({ type: "text" })
  profilePhoto: string;

  @Column({ type: "text", nullable: true })
  fbId: string;

  @Column({ type: "boolean", default: false })
  isDriving: boolean;

  @Column({ type: "boolean", default: false })
  isTaken: boolean;

  @Column({ type: "boolean", default: false })
  isRiding: boolean;

  @Column({ type: "double precision", default: 0 })
  lastLat: number;

  @Column({ type: "double precision", default: 0 })
  lastLog: number;

  @Column({ type: "double precision", default: 0 })
  lastOrientation: number;

  @OneToMany(type => Message, message => message.user)
  messages: Message[];

  @OneToMany(type => Ride, ride => ride.passenger)
  rideAsPassenger: Ride[];

  @OneToMany(type => Ride, ride => ride.driver)
  rideAsDriver: Ride[];

  @OneToMany(type => Chat, chat => chat.passenger)
  chatAsPassenger: Chat[];

  @OneToMany(type => Chat, chat => chat.driver)
  chatAsDriver: Chat[];

  @OneToMany(type => Place, place => place.user)
  places: Place[]

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;

  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  @AfterLoad()
  private loadPassword(): void {
    this.temPassword = this.password;
    }

  public async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }

  private hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, BCRYPT_ROUNDS);
  }

  @BeforeInsert()
  @BeforeUpdate()
  async savePassword(): Promise<void> {
    if (this.password !== this.temPassword) {
      this.password = await this.hashPassword(this.password);
      this.loadPassword()
    }
  }
}

export default User;
