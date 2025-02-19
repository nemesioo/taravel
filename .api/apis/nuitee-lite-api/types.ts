import type { FromSchema } from 'json-schema-to-ts';
import * as schemas from './schemas';

export type GetDataCitiesMetadataParam = FromSchema<typeof schemas.GetDataCities.metadata>;
export type GetDataCitiesResponse200 = FromSchema<typeof schemas.GetDataCities.response['200']>;
export type GetDataCitiesResponse400 = FromSchema<typeof schemas.GetDataCities.response['400']>;
export type GetDataCitiesResponse401 = FromSchema<typeof schemas.GetDataCities.response['401']>;
export type GetDataCountriesMetadataParam = FromSchema<typeof schemas.GetDataCountries.metadata>;
export type GetDataCountriesResponse200 = FromSchema<typeof schemas.GetDataCountries.response['200']>;
export type GetDataCountriesResponse401 = FromSchema<typeof schemas.GetDataCountries.response['401']>;
export type GetDataCurrenciesMetadataParam = FromSchema<typeof schemas.GetDataCurrencies.metadata>;
export type GetDataCurrenciesResponse200 = FromSchema<typeof schemas.GetDataCurrencies.response['200']>;
export type GetDataCurrenciesResponse401 = FromSchema<typeof schemas.GetDataCurrencies.response['401']>;
export type GetDataHotelMetadataParam = FromSchema<typeof schemas.GetDataHotel.metadata>;
export type GetDataHotelResponse200 = FromSchema<typeof schemas.GetDataHotel.response['200']>;
export type GetDataHotelResponse400 = FromSchema<typeof schemas.GetDataHotel.response['400']>;
export type GetDataHotelResponse401 = FromSchema<typeof schemas.GetDataHotel.response['401']>;
export type GetDataHotelsMetadataParam = FromSchema<typeof schemas.GetDataHotels.metadata>;
export type GetDataHotelsResponse200 = FromSchema<typeof schemas.GetDataHotels.response['200']>;
export type GetDataHotelsResponse400 = FromSchema<typeof schemas.GetDataHotels.response['400']>;
export type GetDataHotelsResponse401 = FromSchema<typeof schemas.GetDataHotels.response['401']>;
export type GetDataIatacodesMetadataParam = FromSchema<typeof schemas.GetDataIatacodes.metadata>;
export type GetDataIatacodesResponse200 = FromSchema<typeof schemas.GetDataIatacodes.response['200']>;
export type GetDataIatacodesResponse401 = FromSchema<typeof schemas.GetDataIatacodes.response['401']>;
export type GetDataPlacesMetadataParam = FromSchema<typeof schemas.GetDataPlaces.metadata>;
export type GetDataPlacesResponse200 = FromSchema<typeof schemas.GetDataPlaces.response['200']>;
export type GetDataReviewsMetadataParam = FromSchema<typeof schemas.GetDataReviews.metadata>;
export type GetDataReviewsResponse200 = FromSchema<typeof schemas.GetDataReviews.response['200']>;
export type GetDataReviewsResponse400 = FromSchema<typeof schemas.GetDataReviews.response['400']>;
export type GetDataReviewsResponse401 = FromSchema<typeof schemas.GetDataReviews.response['401']>;
