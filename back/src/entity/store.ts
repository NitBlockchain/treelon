import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class store extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("json", { nullable: true })
  products: any;

  @Column({ type: 'varchar', length: 200 })
  user: string;

  @Column({ type: 'int', nullable: true, default: '0' })
  active: number;

  @Column("geometry")
  geo: string | Object;

}
