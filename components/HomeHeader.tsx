import { View, Text } from "react-native";
import { Input, InputField, InputIcon, InputSlot } from "./ui/input";
import { FontAwesome5 } from "@expo/vector-icons";
import { Link } from "expo-router";
import { SearchIcon } from "@/components/ui/icon";
import { useState } from "react";
import { useHotelStore } from "@/store/HotelStore";

const HomeHeader = () => {
  const [searchQueryValue, setSearchQueryValue] = useState("");

  const { setSearchQuery } = useHotelStore();

  return (
    <View className="h-1/6 w-full items-center justify-center bg-white p-5">
      <View className="h-1/5 w-full"></View>
      <View className="flex-1 items-center justify-end">
        <View className="flex-row items-center justify-center">
          <Input variant="rounded" size="xl" className="ml-5 mr-5 flex-1">
            <InputField
              value={searchQueryValue}
              placeholder="Where do you want to go?"
              onChangeText={setSearchQueryValue}
              onSubmitEditing={() => {
                setSearchQuery(searchQueryValue);
              }}
            />
            <InputSlot
              className="pr-5"
              onPress={() => {
                setSearchQuery(searchQueryValue);
              }}
            >
              <InputIcon as={SearchIcon} className="text-slate-500" />
            </InputSlot>
          </Input>
          {/* <Link href="/profile" asChild>
            <FontAwesome5
              className="mr-5"
              name="user"
              size={30}
              color="black"
            />
          </Link> */}
        </View>
      </View>
    </View>
  );
};
export default HomeHeader;
