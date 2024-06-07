import { RentalEquipment } from './modules/rental-equipment/entities/rental-equipment.entity';

export enum Status {
  BOOKED = 'BOOKED', //Di booking
  CANCELED = 'CANCELED', // Di batalkan
  DONE = 'DONE', // Telah di bayar
}

export type additionalDataTransaction = {
  equipments: RentalEquipment[];
  note: string;
  priceCourt: number; //Harga lapangan saat itu
};
