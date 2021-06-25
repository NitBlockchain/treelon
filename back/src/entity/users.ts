import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class users extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  user: string;

  @Column("json", { nullable: true })
  profile: any; //name, gender etc

  @Column({ type: 'varchar', length: 200 })
  email: string;

  @Column({ type: 'varchar', length: 1000, nullable: true, default: '' })
  password: string;

  @Column("json", { nullable: true })
  wallet: any; //name, gender etc

  @Column("json", { nullable: true })
  collection: any; //name, gender etc

  @Column({ type: 'varchar', length: 200 })
  token: string;

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  active: number;

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  admin: number;

  static async gUSER(user: string) {
     return await this.createQueryBuilder("user")
       .where("user.user = :user", { user: user })
       .getOne();
   }

   static async gEMAIL(email: string) {
      return await this.createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getOne();
    }
    static async gNAME(name: string) {
      return await this.createQueryBuilder("user")
        .where(`user.profile ::jsonb @> \'{"name":"${name}"}\'`)
        .getOne();
    }
    static async gTOKEN(token: string) {
      return await this.createQueryBuilder("user")
      .where("user.token = :token", { token: token })
        .getOne();
    }

}
