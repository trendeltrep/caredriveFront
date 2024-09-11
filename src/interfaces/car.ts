import { AddressDto } from "./address";
import { CarStatus } from "./enums";
import { LocationDto } from "./geolocation";

export interface CarInfoDto {
  brand?: string;
  model?: string | undefined;
  licencePlate ?: string;
  status?: CarStatus;
  location?: LocationDto;
  passengerSeatsNum ?: number;
  temperature?: number;
  fuel?: number;
  id?: string;
}


export interface CreateCarCommand {
  brand?: string;
  model?: string | undefined;
  licencePlate?: string;
  passengerSeatsNum?: number;
  deviceId?: string | undefined;
}

export interface EditCarCommand {
  id?: string;
  brand?: string;
  model?: string | undefined;
  licencePlate?: string;
  passengerSeatsNum?: number;
  deviceId?: string | undefined;
}

