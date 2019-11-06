import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";

@Entity()
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

  @CreateDateColumn() createdAt: string;
  @UpdateDateColumn() updatedAt: string;
}

export default Place;
