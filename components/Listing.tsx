import { View, Text, FlatList, Animated } from "react-native";
import ShowcaseCard from "./ShowcaseCard";
import { Hotel, HotelsInterface } from "@/api/interface/HotelsInterface";
import { useEffect } from "react";
import { useHotelStore } from "@/store/HotelStore";
import BigList from "react-native-big-list";
import { SkeletonText } from "./ui/skeleton";
import { HotelsQueryType } from "@/api/enums";
import React from "react";

// const imageSource = [
//   "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/categorycarousels/model_synapse_carbon_c23.ashx?mh=1920&mw=2560&hash=EB979E931A9D30B37E2228AF85491C79",
//   "https://contents.mediadecathlon.com/p1619170/k$2470d4d473fbec18fcf697f154d42654/triban-rc-500-disc-road-bike-sora-turqoise-blue-triban-8542636.jpg",
//   "https://contents.mediadecathlon.com/p1619234/sq/k$a9d1d702aa04c055f076e193675f3615/rcr-900-af-road-bike-105-van-rysel-8560890.jpg?f=700x700&format=auto",
//   "https://i.ebayimg.com/images/g/p8EAAOSwGYhcEMi3/s-l1200.webp",
//   "https://dqh479dn9vg99.cloudfront.net/wp-content/uploads/sites/9/2018/02/canyon_ultimate_cf_slx_8_review.jpg",
// ];

// const bikes = [
//   "Specialized S-Works Tarmac SL7",
//   "Trek Emonda SLR 9",
//   "Cannondale SuperSix EVO Hi-MOD",
//   "Giant Defy Advanced 1",
//   "Bianchi Infinito CV",
//   "Specialized Roubaix Comp",
//   "Decathlon Triban RC520",
//   "Giant Contend 3",
//   "Ribble R872",
//   "Cannondale Synapse Carbon 105",
//   "Specialized Diverge E5",
// ];

// const getRandomElement = (array: string[]) => {
//   return array[Math.floor(Math.random() * array.length)];
// };

// const imageData = [
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
//   { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
// ];

// interface Item {
//   src: string;
//   title: string;
// }

const ItemSeparatorDefault = () => <View className="w-2 bg-transparent" />;

const ItemSeparatorSearchHotels = () => <View className="h-2 bg-transparent" />;

const Listing: React.FC<any> = ({ hotelsQueryType, searchQuery }) => {
  const { hotels, getHotels } = useHotelStore();

  useEffect(() => {
    getHotels({ aiSearch: searchQuery, hotelsQueryType: hotelsQueryType });
  }, []);
  return (
    <>
      <View>
        {hotelsQueryType !== undefined && (
          <Text className="ml-5 mt-2 text-3xl font-bold">
            {hotelsQueryType === HotelsQueryType.TopRated
              ? "Top Rated"
              : "Most Popular"}
          </Text>
        )}
      </View>
      <FlatList
        data={hotels}
        renderItem={({ item, index }) => (
          <ShowcaseCard
            hotel={item}
            index={index}
            hotelsQueryType={hotelsQueryType}
          />
        )}
        numColumns={1}
        ItemSeparatorComponent={
          hotelsQueryType !== undefined
            ? ItemSeparatorDefault
            : ItemSeparatorSearchHotels
        }
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={21}
        horizontal={hotelsQueryType !== undefined ? true : false}
      />
    </>
  );
};
export default Listing;
