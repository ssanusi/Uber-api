import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { statusType } from "./../types/types.d";

@Entity()
class Ride extends BaseEntity {
  @PrimaryGeneratedColumn("uuid") id: string;

  @Column({
    type: "text",
    enum: ["ACCEPTED", "CANCELED", "ONROUTE", "REQUESTING", "FINISHED"]
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

  @Column({ type: "double precision" })
  price: number;

  @Column({ type: "text" })
  duration: string;

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Ride;
