import {
  Entity, PrimaryGeneratedColumn, Column,
  UpdateDateColumn, CreateDateColumn,
  OneToOne, OneToMany, AfterInsert, AfterUpdate, BaseEntity, JoinColumn
} from "typeorm";

@Entity({ schema: "public" })
export class art extends BaseEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 200,nullable:true })
  user: string;

  @Column("json", { nullable: true })
  userData: any; //name, gender etc

  @Column("json", { nullable: true })
  collection: any;

  @Column("json", { nullable: true })
  nft: any;

  @Column("json", { nullable: true })
  transfers: any; //name, gender etc

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  active: number;

  @Column({ type: 'int', nullable: true, default: '0' })/// 0 user is not logged in 1 user is logged in
  collectionValue: number;

  @Column("geometry",{nullable:true})
  geo: string | Object;

  @Column({ type: 'varchar', length: 100, nullable: true, default: '' })
  category: string;


  static async gID(id: string) {
     return await this.createQueryBuilder("collection")
       .where("collection.id= :id", { id: id })
       .getOne();
   }
  static async gCOLLECTION(id: string,title:string) {
     return await this.createQueryBuilder("collection")
       .where("collection.id= :id", { id: id })
       .andWhere(`collection.collection ::jsonb @> \'{"title":"${title}"}\'`)
       .getOne();
   }

   static async bCOLLECTION(user: string) {
      return await this.createQueryBuilder("collection")
        .where("collection.user = :user", { user: user })
        .getMany();
    }

}
