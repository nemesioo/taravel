export interface BookRoomInterface {
  bookedRooms: BookedRoom[];
  bookingId: string;
  cancellationPolicies: CancellationPolicies;
  checkin: Date;
  checkout: Date;
  clientReference: string;
  commission: number;
  createdAt: Date;
  currency: string;
  holder: Holder;
  hotel: Hotel;
  hotelConfirmationCode: string;
  price: number;
  remarks: string;
  status: string;
  supplier: string;
  supplierBookingId: string;
  supplierBookingName: string;
  supplierId: number;
}

export interface BookedRoom {
  adults: number;
  children: number;
  firstName: string;
  lastName: string;
}

export interface CancellationPolicies {
  cancelPolicyInfos: null;
  hotelRemarks: null;
}

export interface Holder {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

export interface Hotel {
  hotelId: string;
  name: string;
}
