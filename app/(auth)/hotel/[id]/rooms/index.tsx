import { getHotelRooms } from "@/api/endpoint";
import RoomFilterModal from "@/components/RoomFilterModal";
import RoomList from "@/components/RoomList";
import { useHotelStore } from "@/store/HotelStore";
import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { View, Text, Pressable, FlatList } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
const Rooms = () => {
  const {
    hotelInfo,
    getHotelInfo,
    updateRoomModal,
    rooms,
    roomProps,
    getHotelRooms,
    isLoading,
  } = useHotelStore();

  useEffect(() => {
    if (roomProps === undefined) {
      updateRoomModal();
    } else {
      if (hotelInfo!.data.id !== roomProps.hotelId) {
        getHotelRooms();
      }
    }
  }, []);

  return (
    <>
      <Spinner visible={isLoading} textContent="" />
      <Stack.Screen
        options={{
          headerTitle: hotelInfo!.data.name,
          headerRight: () => (
            <Pressable
              className={`rounded-full`}
              onPress={() => updateRoomModal()}
            >
              <Ionicons name="filter-circle-outline" size={30} color={"grey"} />
            </Pressable>
          ),
        }}
      ></Stack.Screen>
      <RoomFilterModal></RoomFilterModal>
      <RoomList></RoomList>
    </>
  );
};
export default Rooms;
