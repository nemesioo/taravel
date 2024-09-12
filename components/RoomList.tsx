import { useHotelStore } from "@/store/HotelStore";
import { View, Text, FlatList } from "react-native";
import RoomCard from "./RoomCard";

const ItemSeparator = () => <View className="h-2 bg-transparent" />;
const RoomList: React.FC<any> = () => {
  const { rooms } = useHotelStore();
  return (
    // <View>
    //   <Text>RoomList</Text>
    // </View>
    <>
      {rooms !== undefined && (
        <View className="items-center justify-center">
          <FlatList
            data={rooms!.data[0].roomTypes}
            renderItem={({ item, index }) => (
              <RoomCard room={item} index={index} />
            )}
            numColumns={1}
            ItemSeparatorComponent={ItemSeparator}
            keyExtractor={(item) => item.offerId.toString()}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={21}
          />
        </View>
      )}
    </>
  );
};
export default RoomList;
