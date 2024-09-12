export interface HotelInfo {
  data: Data;
}

export interface Data {
  id: string;
  name: string;
  hotelDescription: string;
  hotelImportantInformation: string;
  checkinCheckoutTimes: CheckinCheckoutTimes;
  hotelImages: HotelImage[];
  mainPhoto: string;
  country: string;
  city: string;
  starRating: number;
  location: Location;
  address: string;
  hotelFacilities: string[];
  facilities: Facility[];
  rooms: Room[];
  phone: string;
  fax: string;
  email: string;
  hotelType: string;
  airportCode: string;
  rating: number;
  reviewCount: number;
  parking: string;
  groupRoomMin: number;
  childAllowed: boolean;
  petsAllowed: boolean;
  policies: Policy[];
}

export interface CheckinCheckoutTimes {
  checkin: string;
  checkinStart: string;
  checkinEnd: string;
}

export interface Facility {
  facilityID: number;
  name: string;
}

export interface HotelImage {
  url: string;
  urlHD: string;
  caption: string;
  order: number;
  defaultImage: boolean;
}

export interface Location {
  latitude: number;
  longitude: number;
}

export interface Policy {
  policyType: string;
  name: Name;
  description: string;
  childAllowed: string;
  petsAllowed: string;
  parking: string;
}

export enum Name {
  General = "General",
  Pets = "Pets",
}

export interface Room {
  id: number;
  roomName: string;
  description: string;
  roomSizeSquare: number;
  roomSizeUnit: string;
  hotelID: string;
  maxAdults: number;
  maxChildren: number;
  maxOccupancy: number;
  bedTypes: BedType[];
  roomAmenities: RoomAmenity[];
  photos: Photo[];
}

export interface BedType {
  quantity: number;
  bedType: string;
  bedSize: string;
}

export interface Photo {
  url: string;
  imageDescription: string;
  imageClass1: string;
  imageClass2: string;
  failoverPhoto: string;
  mainPhoto: boolean;
  score: number;
  classID: number;
  classOrder: number;
  hdURL: string;
}

export interface RoomAmenity {
  amenitiesID: number;
  name: string;
  sort: number;
}
