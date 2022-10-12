import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Hotel {
    @PrimaryGeneratedColumn()
    id : string;
    @Column()
    nama_hotel : string;
    @Column()
    no_kontak : number;
    @Column()
    alamat : string;
    @Column()
    bintang : Bintang;
    @Column()
    status : Status;
    @Column()
    descripton : string
}

export enum Status{
    SWASTA = 'swasta',
    BUMN = 'bumn'
}


export enum Bintang{
    SATU = '1',
    DUA = '2',
    TIGA = '3',
    EMPAT = '4'
}



export class UserHotel{
    @PrimaryGeneratedColumn()
    id : number;
    @Column()
    username : string;
    @Column()
    email : string;
    @Column()
    password: string;
    @Column()
    no_hp: number;

}

