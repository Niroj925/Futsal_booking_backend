import { Column, Entity, ManyToOne } from "typeorm";
import { baseEntity } from "./base/base.entity";
import { futsalEntity } from "./futsal.entity";
import { futsalCourtEntity } from "./futsalCourt.entity";

@Entity('futsalImage')
export class futsalImageEntity extends baseEntity{
@Column()
image:string;

@ManyToOne(()=>futsalEntity,(futsal)=>futsal.image)
futsal:futsalEntity;

@ManyToOne(()=>futsalCourtEntity,(futsal)=>futsal.image,{onDelete:'CASCADE'})
court:futsalCourtEntity;
}