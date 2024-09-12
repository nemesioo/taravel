import {
  book,
  getHotelInfo,
  getHotelRooms,
  getHotels,
  prebook,
} from "@/api/endpoint";
import { BookRoomInterface } from "@/api/interface/BookRoomInterface";
import { HotelInfo } from "@/api/interface/HotelInfoInterface";
import { HotelsInterface, Hotel } from "@/api/interface/HotelsInterface";
import { PrebookInterface } from "@/api/interface/PrebookInterface";
import { RoomInfo } from "@/api/interface/RoomInfoInterface";
import {
  GetHotelsProps,
  GetHotelInfoProps,
  GetHotelRoomProps,
  PreBookProps,
  BookProps,
} from "@/api/props";
import { create } from "zustand";

interface HotelStore {
  isLoading: boolean;
  hotels?: Hotel[];
  searchQuery?: string;
  selectedHotel?: Hotel;
  hotelInfo?: HotelInfo;
  roomProps?: GetHotelRoomProps;
  rooms?: RoomInfo;
  openRoomQueryModal: boolean;
  prebookInfo?: PrebookInterface;
  bookInfo?: BookRoomInterface;
  redirectToMainPage?: boolean;
  setSearchQuery: (props: string) => void;
  getHotels: (props: GetHotelsProps) => void;
  setHotel: (props: Hotel) => void;
  getHotelInfo: (props: GetHotelInfoProps) => void;
  getHotelRooms: () => void;
  updateRoomModal: () => void;
  setRoomProps: (props: GetHotelRoomProps) => void;
  prebook: (props: PreBookProps) => void;
  bookRoom: (props: BookProps) => void;
}

export const useHotelStore = create<HotelStore>((set, get) => ({
  isLoading: false,
  hotels: undefined,
  searchQuery: "",
  hotelInfo: undefined,
  selectedHotel: undefined,
  openRoomQueryModal: false,
  rooms: undefined,
  prebookInfo: undefined,
  redirectToMainPage: false,
  setSearchQuery: (props) => {
    set({ searchQuery: props });
  },
  getHotels: async (props) => {
    try {
      set({ isLoading: true });
      const res = await getHotels(props);

      // console.log(res.data);

      const hotelsWithImage = res.data.filter(
        (hotel) => hotel.main_photo !== "",
      );

      console.log(hotelsWithImage.length);

      set({
        isLoading: false,
        hotels: hotelsWithImage,
      });
    } catch (e) {
      //TODO error handling
      console.log(e);
      set({ isLoading: false });
    }
  },

  setHotel: (props) => {
    set({ selectedHotel: props });
  },
  getHotelInfo: async (props) => {
    try {
      set({ isLoading: true });
      const res = await getHotelInfo(props);

      set({
        isLoading: false,
        hotelInfo: res,
      });
    } catch (e) {
      //TODO error handling
      console.log(e);
      set({ isLoading: false });
    }
  },
  getHotelRooms: async () => {
    try {
      console.log(get().roomProps!);
      set({ isLoading: true });
      if (get().roomProps !== undefined) {
        const res = await getHotelRooms(get().roomProps!);

        set({
          isLoading: false,
          rooms: res,
        });
      } else {
        set({ isLoading: false });
      }
    } catch (e) {
      //TODO error handling
      console.log(e);
      set({ isLoading: false });
    }
  },
  updateRoomModal: () => {
    set({ openRoomQueryModal: !get().openRoomQueryModal });
  },
  setRoomProps: (props) => {
    set({ roomProps: props });
  },
  prebook: async (props) => {
    try {
      // set({ isLoading: true });
      // if (get().roomProps !== undefined) {
      //   const res = await getHotelRooms(get().roomProps!);

      //   set({
      //     isLoading: false,
      //     rooms: res,
      //   });
      // } else {
      //   set({ isLoading: false });
      // }
      const res = await prebook(props);
      console.log("PREBOOK INFO");
      console.log(res);
      set({
        isLoading: false,
        prebookInfo: res,
      });
    } catch (e) {
      //TODO error handling
      console.log(e);
      set({ isLoading: false });
    }
  },
  bookRoom: async (props) => {
    try {
      set({ isLoading: true });
      // if (get().roomProps !== undefined) {
      //   const res = await getHotelRooms(get().roomProps!);

      // } else {
      //   set({ isLoading: false });
      // }
      const res = await book(props);
      console.log(res);
      set({
        isLoading: false,
        bookInfo: res,
        redirectToMainPage: true,
      });
    } catch (e) {
      //TODO error handling
      console.log(e);
      set({ isLoading: false });
    }
  },
}));
