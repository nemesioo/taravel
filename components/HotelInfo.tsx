import { useHotelStore } from "@/store/HotelStore";
import { Link, Stack, router } from "expo-router";
import { useEffect } from "react";
import { View, Text, Image, Dimensions, ScrollView } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { htmlToText } from "html-to-text";
import { Button, ButtonText } from "./ui/button";

interface HotelInfoInterface {
  hotelId: string | string[];
}

const HotelCarousel = () => {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const { isLoading, hotelInfo } = useHotelStore();

  if (!isLoading && hotelInfo !== undefined) {
    const images = hotelInfo!.data.hotelImages;
    return (
      <>
        <View style={{ height: screenHeight * 0.3 }}>
          <Carousel
            style={{
              width: "100%",
              height: screenHeight * 0.3,
              alignItems: "center",
              justifyContent: "center",
            }}
            width={screenWidth * 0.9}
            height={screenHeight * 0.28}
            pagingEnabled={true}
            snapEnabled={true}
            mode={"horizontal-stack"}
            loop={true}
            autoPlay={true}
            autoPlayReverse={false}
            data={images}
            modeConfig={{
              snapDirection: "left",
              stackInterval: 18,
            }}
            customConfig={() => ({ type: "positive", viewCount: 5 })}
            renderItem={({ item, index }) => (
              <View>
                <Image
                  className="h-full w-full"
                  source={{
                    uri: item.url,
                  }}
                  onLoad={() => {
                    //   updateImageStatus(true);
                  }}
                  resizeMode="cover"
                />
              </View>
            )}
          />
        </View>
      </>
    );
  }

  return <></>;
};

const HotelDetails = () => {
  const { isLoading, hotelInfo } = useHotelStore();

  if (!isLoading && hotelInfo !== undefined) {
    const data = hotelInfo.data;

    const hotelDescription = htmlToText(data.hotelDescription);

    return (
      <>
        <View className="m-5">
          <Text>{hotelDescription}</Text>
        </View>
      </>
    );
  }

  return <></>;
};

const HotelInfo: React.FC<HotelInfoInterface> = ({ hotelId }) => {
  const { hotelInfo, getHotelInfo } = useHotelStore();

  useEffect(() => {
    getHotelInfo({ hotelId: hotelId });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{ title: hotelInfo !== undefined ? hotelInfo?.data.name : "" }}
      />
      <HotelCarousel></HotelCarousel>
      <View className="flex-1">
        <ScrollView className="h-full">
          <HotelDetails></HotelDetails>
        </ScrollView>
        <View className="absolute bottom-10 w-full items-center justify-center">
          <Button
            onPress={() => {
              router.push(`/hotel/${hotelId}/rooms`);
            }}
            className="item-center h-auto w-auto justify-center rounded-full bg-slate-700 p-4 active:bg-slate-800"
          >
            <ButtonText className="text-center text-lg font-bold">
              Check Available Rooms
            </ButtonText>
          </Button>
        </View>
      </View>
    </>
  );
};
export default HotelInfo;
