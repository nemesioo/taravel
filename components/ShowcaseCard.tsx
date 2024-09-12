import { View, Text, Pressable, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";
import { Hotel } from "@/api/interface/HotelsInterface";
import FastImage from "react-native-fast-image";
import { router } from "expo-router";
import React from "react";
import { useHotelStore } from "@/store/HotelStore";
import { HotelsQueryType } from "@/api/enums";

interface ShowcardInterface {
  hotel: Hotel;
  index: number;
  hotelsQueryType?: HotelsQueryType;
}

const ShowcaseCard: React.FC<ShowcardInterface> = React.memo(
  ({ hotel, index, hotelsQueryType }) => {
    const [like, updateLike] = useState(false);
    const [imageLoaded, updateImageStatus] = useState(false);
    const { setHotel } = useHotelStore();

    const getItemMargin = () => {
      if (index % 2 === 0) {
        return "ml-4 mr-2";
      } else {
        return "mr-4 ml-2";
      }
    };

    return (
      <>
        <Pressable
          onPress={() => {
            if (imageLoaded) {
              setHotel(hotel);
              router.push(`/hotel/${hotel.id}`);
            }
          }}
        >
          {hotelsQueryType !== undefined ? (
            <View className={`mb-2 ${getItemMargin()} `}>
              {!imageLoaded && (
                <View>
                  <Skeleton
                    variant="sharp"
                    speed={3}
                    className="absolute h-60 w-80"
                  />
                </View>
              )}
              <Image
                className="h-60 w-80"
                source={{
                  uri: hotel.main_photo,
                }}
                onError={(e) => {
                  console.log("Image failed to load:", e.nativeEvent.error);
                }}
                onLoad={() => {
                  updateImageStatus(true);
                }}
                resizeMode="cover"
              />
              {imageLoaded && (
                <View className="absolute right-2 top-2">
                  <View className="absolute flex-1 bg-red-400"></View>
                  <Pressable
                    className={`rounded-full ${!like ? "bg-white" : ""}`}
                    onPress={() => updateLike(!like)}
                  >
                    <Ionicons
                      name="heart-circle-outline"
                      size={30}
                      color={like ? "red" : "gainsboro"}
                    />
                  </Pressable>
                </View>
              )}
              {!imageLoaded && (
                <View>
                  <SkeletonText speed={3} className="mt-2 h-3 w-60" />
                  <SkeletonText speed={3} className="mt-2 h-3 w-40" />
                </View>
              )}
              {imageLoaded && (
                <View className="mt-2 w-80 flex-row">
                  <View className="w-4/5 pr-5">
                    <Text className="text-md font-bold">{hotel.name}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="location" size={15} color="gainsboro" />
                      <Text className="ml-1 text-xs font-bold text-slate-500">
                        {hotel.address}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 flex-row items-center justify-center">
                    <Ionicons name="star" size={20} color="gainsboro" />
                    <Text className="text-md ml-1 font-bold">
                      {hotel.stars.toFixed(1)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          ) : (
            <>
              <View className="m-4 h-auto">
                {!imageLoaded && (
                  <Skeleton
                    variant="sharp"
                    speed={3}
                    className="absolute h-60 w-full"
                  />
                )}

                <Image
                  className="h-60 w-full"
                  source={{
                    uri: hotel.main_photo,
                  }}
                  onLoad={() => {
                    updateImageStatus(true);
                  }}
                  resizeMode="cover"
                />

                {imageLoaded && (
                  <View className="absolute right-2 top-2">
                    <View className="absolute flex-1 bg-red-400"></View>
                    <Pressable
                      className={`rounded-full ${!like ? "bg-white" : ""}`}
                      onPress={() => updateLike(!like)}
                    >
                      <Ionicons
                        name="heart-circle-outline"
                        size={30}
                        color={like ? "red" : "gainsboro"}
                      />
                    </Pressable>
                  </View>
                )}
              </View>
              {!imageLoaded && (
                <View>
                  <SkeletonText speed={3} className="h-3" />
                  <SkeletonText speed={3} className="mt-2 h-3 w-40" />
                </View>
              )}
              {imageLoaded && (
                <View className="ml-5 mr-5 flex-row">
                  <View className="w-4/5">
                    <Text className="text-md font-bold">{hotel.name}</Text>
                    <View className="flex-row items-center">
                      <Ionicons name="location" size={15} color="gainsboro" />
                      <Text className="ml-1 text-xs font-bold text-slate-500">
                        {hotel.address}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-1 flex-row items-center">
                    <Ionicons name="star" size={20} color="gainsboro" />
                    <Text className="text-md ml-2 font-bold">
                      {hotel.stars.toFixed(1)}
                    </Text>
                  </View>
                </View>
              )}
            </>
          )}
        </Pressable>
      </>
    );
  },
);
export default ShowcaseCard;
