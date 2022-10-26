import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Messages {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column()
    text: string;

    @Column()
    timeStamp: string;
}