import { View, Text } from "react-native";
import { Stack } from "expo-router";
import Spinner from "react-native-loading-spinner-overlay";
import { Button, ButtonText } from "@/components/ui/button";
import { useAuth } from "@clerk/clerk-expo";
import { useAuthStore } from "@/store/AuthStore";

const Home = () => {
  const { signOut } = useAuthStore();
  const useAuthHook = useAuth();

  return (
    <View>
      <Stack.Screen options={{ headerTitle: "" }} />
      <Text>Home</Text>
      {/* <Spinner visible textContent={"Loading..."} /> */}
      <Button
        size="md"
        variant="solid"
        action="primary"
        onPress={() => signOut(useAuthHook)}
      >
        <ButtonText>Logout</ButtonText>
      </Button>
    </View>
  );
};
export default Home;
