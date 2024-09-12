import {
  View,
  Text,
  Pressable,
  ScrollView,
  FlatList,
  Animated,
} from "react-native";
import { Stack, useRouter, Link } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-expo";
import { useAuthStore } from "@/store/AuthStore";
import { Icon } from "@/components/ui/icon";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import ShowcaseCard from "@/components/ShowcaseCard";
import Listing from "@/components/Listing";
import { Input, InputField } from "@/components/ui/input";
import { useHotelStore } from "@/store/HotelStore";
import HomeHeader from "@/components/HomeHeader";
import { HotelsQueryType } from "@/api/enums";

const Home = () => {
  const { logout } = useAuthStore();

  const useAuthHook = useAuth();

  const { searchQuery, isLoading } = useHotelStore();

  const scrollY = useRef(new Animated.Value(0)).current;

  const opacity = scrollY.interpolate({
    inputRange: [0, 50], // Adjust these values as needed
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 500], // When the scroll value is between 0 and 150
    outputRange: [64, 0], // The height should change from 150 to 60
    extrapolate: "clamp", // Clamp the output range to prevent overshooting
  });

  // useEffect(() => {
  //   console.log(headerHeight);
  // }, [headerHeight]);

  useEffect(() => {
    scrollY.addListener(({ value }) => {
      // setHeaderVisible(value < 100); // Change this threshold as needed
      // console.log(value);
      // if (value > 150) {
      //   updateHeaderHeight("");
      // } else if (value < 150) {
      //   updateHeaderHeight("h-16");
      // }
      // console.log(translateY);
      // console.log(opacity);
    });
    return () => scrollY.removeAllListeners();
  }, [scrollY]);

  return (
    <>
      {/* <Stack.Screen
        options={{
          headerTitle: () => <HomeHeader />,
          // headerStyle: {
          //   backgroundColor: "grey",
          // },
        }}
      /> */}
      <Spinner visible={isLoading} textContent="" />
      <HomeHeader />
      <View className="flex-1 bg-white">
        {/* <Animated.View
          style={{ opacity, height: headerHeight }}
        > */}
        {/* <View className="mb-3 ml-2 mt-3 flex-1 flex-row items-center justify-center">
            <Input className="h-full w-4/5 rounded-full">
              <InputField></InputField>
            </Input>
            <Link href="/profile" asChild>
              <AntDesign size={24} name="user" color="black" />
            </Link>
          </View> */}
        {/* </Animated.View> */}
        {searchQuery !== "" && (
          <View>
            <Listing searchQuery={searchQuery} />
          </View>
        )}

        {searchQuery === "" && (
          <View>
            <Listing hotelsQueryType={HotelsQueryType.TopRated} />
            <Listing hotelsQueryType={HotelsQueryType.MostPopular} />
          </View>
        )}
      </View>
    </>
  );
};
export default Home;
