import { View, Text, Pressable, Image } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Skeleton, SkeletonText } from "@/components/ui/skeleton";

interface Item {
  src: string;
  title: string;
  index: number;
}

const ShowcaseCard: React.FC<Item> = ({ src, title, index }) => {
  const [like, updateLike] = useState(false);
  const [imageLoaded, updateImageStatus] = useState(false);

  const getItemMargin = () => {
    if (index % 2 === 0) {
      return "ml-4 mr-2";
    } else {
      return "mr-4 ml-2";
    }
  };

  const date = new Date();

  date.getFullYear();

  return (
    <>
      <View className={`mr- mb-2 flex-1 ${getItemMargin()}`}>
        <View className="mb-1 h-auto">
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
              uri: src,
            }}
            onLoad={() => {
              updateImageStatus(true);
            }}
            resizeMode="contain"
          />

          {imageLoaded && (
            <View className="absolute right-2 top-2">
              <View className="absolute flex-1 bg-red-400"></View>
              <Pressable
                className={`rounded-full ${!like ? "bg-slate-200" : ""}`}
                onPress={() => updateLike(!like)}
              >
                <Ionicons
                  name="heart-circle-outline"
                  size={30}
                  color={like ? "red" : "white"}
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
          <View>
            <Text className="text-md font-bold">{title}</Text>
            <Text className="text-sm font-bold text-slate-500">$1000.00</Text>
          </View>
        )}
      </View>
    </>
  );
};
export default ShowcaseCard;
