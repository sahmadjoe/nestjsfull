import { IsString, Matches, MaxLength, MinLength } from "class-validator";
import { isNumberObject, isStringObject } from "util/types";
import { Bintang, Status } from "../entities/hotel.entity";

export class CreateHotelDto {
    id : string;
    nama_hotel : string;
    no_kontak : number;
    alamat : string;
    bintang : Bintang;
    status : Status;
    descripton : string
}

export class autHotelCredensial{
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;
   

    @IsString()
    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.\d)|(?=.\W+))(?![.\n])(?=.[A-Z])(?=.[a-z]).*$/, {
        message: 'password is too weak',
      })
    password: string;

}