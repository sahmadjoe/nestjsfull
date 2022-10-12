import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { Hotel } from './entities/hotel.entity';
import { HotelRepository } from './hotel-repository';

@Injectable()
export class HotelService {

  constructor(@InjectRepository(HotelRepository)private hotelRepository:HotelRepository){ }

  async create(createHotelDto: CreateHotelDto) :Promise<Hotel> {
    return await this.hotelRepository.createHotel(createHotelDto)
  }

  findAll() {
    return this.hotelRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} hotel`;
  }

  update(id: number, updateHotelDto: UpdateHotelDto) {
    return `This action updates a #${id} hotel`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotel`;
  }




  ////signUp

  





}
