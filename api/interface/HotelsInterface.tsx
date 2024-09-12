export interface HotelsInterface {
  data: Hotel[];
  hotelIDS: string;
  total: number;
}

export interface Hotel {
  id: string;
  name: string;
  hotelDescription: string;
  currency: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  address: string;
  zip: string;
  main_photo: string;
  thumbnail: string;
  stars: number;
  rating: number;
  reviewCount: number;
  facilityIDS: number[];
}

// Converts JSON strings to/from your types
export class Convert {
  public static toHotels(json: string): HotelsInterface {
    return JSON.parse(json);
  }

  public static hotelsToJson(value: HotelsInterface): string {
    return JSON.stringify(value);
  }
}
