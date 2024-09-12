import HotelInfo from "@/components/HotelInfo";
import { useLocalSearchParams } from "expo-router";

export default function Hotel() {
  const { id } = useLocalSearchParams();

  return <HotelInfo hotelId={id} />;
}
