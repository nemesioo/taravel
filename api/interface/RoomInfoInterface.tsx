export interface RoomInfo {
  data: Datum[];
  guestLevel: number;
  sandbox: boolean;
}

export interface Datum {
  hotelId: string;
  roomTypes: RoomType[];
}

export interface RoomType {
  roomTypeId: string;
  offerId: string;
  supplier: string;
  supplierId: number;
  rates: Rate[];
  offerRetailRate: OfferRetailRate;
  suggestedSellingPrice: OfferRetailRate;
  priceType: string;
  rateType: string;
}

export interface OfferRetailRate {
  amount: number;
  currency: string;
}

export interface Rate {
  rateId: string;
  occupancyNumber: number;
  name: string;
  maxOccupancy: number;
  adultCount: number;
  childCount: number;
  boardType: string;
  boardName: string;
  remarks: string;
  priceType: string;
  commission: OfferRetailRate[];
  retailRate: RetailRate;
  cancellationPolicies: CancellationPolicies;
}

export interface CancellationPolicies {
  cancelPolicyInfos: CancelPolicyInfo[];
  hotelRemarks: any[];
  refundableTag: string;
}

export interface CancelPolicyInfo {
  cancelTime: Date;
  amount: number;
  currency?: string;
  type: string;
  timezone: string;
}

export interface RetailRate {
  total: OfferRetailRate[];
  suggestedSellingPrice: OfferRetailRate[];
  taxesAndFees: TaxesAndFee[] | null;
}

export interface TaxesAndFee {
  included: boolean;
  description: string;
  amount: number;
  currency: string;
}
