import { HotelsQueryType } from "./enums";
import { BookRoomInterface } from "./interface/BookRoomInterface";
import { HotelInfo } from "./interface/HotelInfoInterface";
import { HotelsInterface, Convert } from "./interface/HotelsInterface";
import { PrebookInterface } from "./interface/PrebookInterface";
import { RoomInfo } from "./interface/RoomInfoInterface";
import {
  GetHotelsProps,
  GetHotelInfoProps,
  GetHotelRoomProps,
  PreBookProps,
  BookProps,
} from "./props";
import axios from "axios";

const apiKey = process.env.EXPO_PUBLIC_LITE_API_SANDBOX_KEY!;

const liteApi = require("liteapi-node-sdk")(apiKey);

export const getHotels = async (
  props: GetHotelsProps,
): Promise<HotelsInterface> => {
  if (props.aiSearch != "") {
  }

  const searchQuery =
    props.aiSearch != undefined ? props.aiSearch.replaceAll(" ", "%20") : "";

  console.log(searchQuery);
  const url =
    searchQuery != ""
      ? `https://api.liteapi.travel/v3.0/data/hotels?countryCode=PH&limit=10&timeout=4&aiSearch=${searchQuery}`
      : props.hotelsQueryType == HotelsQueryType.TopRated
        ? `https://api.liteapi.travel/v3.0/data/hotels?countryCode=PH&limit=10&timeout=4&minRating=8.5&starRating=4.5%2C5.0`
        : `https://api.liteapi.travel/v3.0/data/hotels?countryCode=PH&limit=10&timeout=4&minRating=8.5&minReviewsCount=1000&starRating=4.5%2C5.0`;

  try {
    const options = {
      method: "GET",
      url: url,
      headers: {
        accept: "application/json",
        "X-API-Key": apiKey,
      },
    };

    return await axios
      .request(options)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.error(error);
        throw error;
      });
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

export const getHotelInfo = async (
  props: GetHotelInfoProps,
): Promise<HotelInfo> => {
  try {
    const options = {
      method: "GET",
      url: `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${props.hotelId}&timeout=4`,
      headers: {
        accept: "application/json",
        "X-API-Key": "sand_d4619991-6d4d-4d65-8bf0-e50827aa1327",
      },
    };

    return await axios
      .request(options)
      .then(function (response: any) {
        return response.data;
      })
      .catch(function (error: any) {
        console.error(error);
        throw error;
      });
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

export const getHotelRooms = async (
  props: GetHotelRoomProps,
): Promise<RoomInfo> => {
  try {
    // const axios = require("axios");

    const options = {
      method: "POST",
      url: "https://api.liteapi.travel/v3.0/hotels/rates",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "X-API-Key": "sand_d4619991-6d4d-4d65-8bf0-e50827aa1327",
      },
      data: {
        hotelIds: [props.hotelId],
        occupancies: [{ adults: props.guestAdult }],
        currency: "PHP",
        guestNationality: "PH",
        //FORMAT YYYY-MM-DD
        checkin: props.checkIn,
        checkout: props.checkOut,
        roomMapping: false,
        countryCode: "PH",
        strictFacilityFiltering: false,
      },
    };

    return await axios
      .request(options)
      .then(function (response: any) {
        console.log(response.data);
        return response.data;
      })
      .catch(function (error: any) {
        console.error(error);
        throw error;
      });
  } catch (error) {
    console.error("Error fetching rates:", error);
    throw error;
  }
};

export const prebook = async (
  props: PreBookProps,
): Promise<PrebookInterface> => {
  try {
    // const options = {
    //   method: "GET",
    //   url: `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${props.hotelId}&timeout=4`,
    //   headers: {
    //     accept: "application/json",
    //     "X-API-Key": "sand_d4619991-6d4d-4d65-8bf0-e50827aa1327",
    //   },
    // };

    // return await axios
    //   .request(options)
    //   .then(function (response: any) {
    //     return response.data;
    //   })
    //   .catch(function (error: any) {
    //     console.error(error);
    //     throw error;
    //   });
    const result = await liteApi.preBook({
      offerId: props.offerId,
      usePaymentSdk: true,
    });

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error("Error Pre-booking:", error);
    throw error;
  }
};

export const book = async (props: BookProps): Promise<BookRoomInterface> => {
  try {
    // const options = {
    //   method: "GET",
    //   url: `https://api.liteapi.travel/v3.0/data/hotel?hotelId=${props.hotelId}&timeout=4`,
    //   headers: {
    //     accept: "application/json",
    //     "X-API-Key": "sand_d4619991-6d4d-4d65-8bf0-e50827aa1327",
    //   },
    // };

    // return await axios
    //   .request(options)
    //   .then(function (response: any) {
    //     return response.data;
    //   })
    //   .catch(function (error: any) {
    //     console.error(error);
    //     throw error;
    //   });
    // const result = await liteApi.preBook({
    //   offerId: props.offerId,
    //   usePaymentSdk: true,
    // });

    const result = await liteApi.book({
      holder: {
        firstName: props.holder.firstName,
        lastName: props.holder.lastName,
        email: props.holder.email,
      },
      payment: {
        method: props.payment.method,
      },
      prebookId: props.prebookId,
      guests: [...props.guest],
    });

    console.log(result.data);

    return result.data;
  } catch (error) {
    console.error("Error Pre-booking:", error);
    throw error;
  }
};
