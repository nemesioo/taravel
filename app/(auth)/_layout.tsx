import { FontAwesome } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();

  return (
    // <Tabs screenOptions={{ tabBarActiveTintColor: "black" }}>
    //   <Tabs.Screen
    //     name="home"
    //     options={{
    //       title: "Home",
    //       tabBarIcon: ({ color }) => (
    //         <FontAwesome size={28} name="home" color={color} />
    //       ),
    //     }}
    //     redirect={!isSignedIn}
    //   />
    //   <Tabs.Screen
    //     name="profile"
    //     options={{
    //       title: "Profile",
    //       tabBarIcon: ({ color }) => (
    //         <FontAwesome size={28} name="user-circle-o" color={color} />
    //       ),
    //     }}
    //     redirect={!isSignedIn}
    //   />
    // </Tabs>
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerTintColor: "#334155",
      }}
    >
      <Stack.Screen
        name="home"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="profile" options={{ title: "Profile" }} />
      {/* <Stack.Screen name="hotel/[id]" options={{ title: "Hotel Info" }} /> */}
      {/* <Stack.Screen name="hotel/[id]/rooms" options={{ title: "Room" }} /> */}
    </Stack>
  );
}
