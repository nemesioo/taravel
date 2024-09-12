import { HotelsQueryType } from "./enums";

export interface GetHotelsProps {
  aiSearch: string;
  hotelsQueryType: HotelsQueryType;
}

export interface GetHotelInfoProps {
  hotelId: string | string[];
}

export interface GetHotelRoomProps {
  hotelId: string | string[];
  checkIn: string;
  checkOut: string;
  guestAdult: number;
}

export interface PreBookProps {
  offerId: string | string[];
}

export interface BookHolder {
  firstName: string;
  lastName: string;
  email: string;
}

export interface BookPayment {
  method: string;
  transactionId: string;
}

export interface BookGuest {
  occupancyNumber: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface BookProps {
  holder: BookHolder;
  payment: BookPayment;
  prebookId: string;
  guest: BookGuest[];
}
