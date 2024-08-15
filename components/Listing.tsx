import { View, Text, FlatList, Animated } from "react-native";
import ShowcaseCard from "./ShowcaseCard";

const imageSource = [
  "https://d1mo5ln9tjltxq.cloudfront.net/-/media/images/categorycarousels/model_synapse_carbon_c23.ashx?mh=1920&mw=2560&hash=EB979E931A9D30B37E2228AF85491C79",
  "https://contents.mediadecathlon.com/p1619170/k$2470d4d473fbec18fcf697f154d42654/triban-rc-500-disc-road-bike-sora-turqoise-blue-triban-8542636.jpg",
  "https://contents.mediadecathlon.com/p1619234/sq/k$a9d1d702aa04c055f076e193675f3615/rcr-900-af-road-bike-105-van-rysel-8560890.jpg?f=700x700&format=auto",
  "https://i.ebayimg.com/images/g/p8EAAOSwGYhcEMi3/s-l1200.webp",
  "https://dqh479dn9vg99.cloudfront.net/wp-content/uploads/sites/9/2018/02/canyon_ultimate_cf_slx_8_review.jpg",
];

const bikes = [
  "Specialized S-Works Tarmac SL7",
  "Trek Emonda SLR 9",
  "Cannondale SuperSix EVO Hi-MOD",
  "Giant Defy Advanced 1",
  "Bianchi Infinito CV",
  "Specialized Roubaix Comp",
  "Decathlon Triban RC520",
  "Giant Contend 3",
  "Ribble R872",
  "Cannondale Synapse Carbon 105",
  "Specialized Diverge E5",
];

const getRandomElement = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

const imageData = [
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
  { src: getRandomElement(imageSource), title: getRandomElement(bikes) },
];

interface Item {
  src: string;
  title: string;
}

const renderItem = ({ item, index }: { item: Item; index: number }) => (
  <ShowcaseCard src={item.src} title={item.title} index={index} />
);

const ItemSeparator = () => <View className="h-4 bg-transparent" />;

const Listing: React.FC<any> = ({ scrollY }) => {
  return (
    <>
      {/* <View className="pl-2 pr-2 pt-2"> */}
      <FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        className="h-auto"
        data={imageData}
        renderItem={renderItem}
        numColumns={2}
        ItemSeparatorComponent={ItemSeparator}
      />
      {/* </View> */}
    </>
  );
};
export default Listing;
