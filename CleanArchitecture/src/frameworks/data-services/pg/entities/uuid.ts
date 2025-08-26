import {
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  export class uuidEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  }
  