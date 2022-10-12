import { Injectable, NotFoundException } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CreateHotelDto } from "./dto/create-hotel.dto";
import { UpdateHotelDto } from "./dto/update-hotel.dto";
import { Bintang, Hotel, Status } from "./entities/hotel.entity";

@Injectable()
export class HotelRepository extends Repository<Hotel>{
    constructor(private source : DataSource){
        super(Hotel, source.createEntityManager())
    }

    async createHotel(createHotel:CreateHotelDto): Promise<Hotel>{
        const { nama_hotel,no_kontak,alamat,descripton,status} = createHotel;

        const htl = new Hotel()

        htl.nama_hotel = nama_hotel;
        htl.no_kontak = no_kontak;
        htl.alamat = alamat;
        htl.bintang = Bintang.DUA;
        htl.descripton = descripton;
        htl.status = Status.SWASTA

        await this.save(htl)

        return htl
    }

    async updateHotel(id: string, data:UpdateHotelDto) : Promise<Hotel>{
        const { nama_hotel,alamat,no_kontak,bintang} = data;
        await this.update({id},{...data})

        return this.getHotelId(id)
    }

    async getHotelId(id: string) : Promise<Hotel>{
        const hotell = await this.findOneBy({id})

        if (! hotell){
            throw new NotFoundException(' tidak ada yg sesprti itu')
        }

        return hotell
    }
    
}
