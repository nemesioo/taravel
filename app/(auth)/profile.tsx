import React from "react";
import {
  View,
  Animated,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

const data = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

const App = () => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  const marginTop = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -60],
    extrapolate: "clamp",
  });

  const paddingTop = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [10, 110],
    extrapolate: "clamp",
  });

  const opacity = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

  const renderItem = ({ item }: { item: string }) => {
    return (
      <View style={styles.card}>
        <Text>{`Card ${item}`}</Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <Animated.View
        style={{
          zIndex: 100,
          paddingBottom: 10,
          transform: [{ translateY }],
        }}
      >
        <Animated.View style={[styles.searchBar, { opacity }]}>
          <Text>Search Bar</Text>
        </Animated.View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((num) => {
            return (
              <View key={num} style={styles.tab}>
                <Text>Tab</Text>
              </View>
            );
          })}
        </ScrollView>
      </Animated.View>
      <Animated.FlatList
        style={{ marginTop, paddingTop }}
        // contentContainerStyle={{paddingTop: 150}}
        refreshControl={
          <RefreshControl
            tintColor="#fff"
            onRefresh={() => {
              console.warn("Refreshing");
            }}
            refreshing={false}
          />
        }
        bounces={true}
        data={data}
        keyExtractor={(item) => item}
        scrollEventThrottle={16}
        renderItem={renderItem}
        onScroll={(e) => {
          if (e.nativeEvent.contentOffset.y > 0)
            scrollY.setValue(e.nativeEvent.contentOffset.y);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    marginHorizontal: "5%",
    width: "90%",
    marginTop: 40,
    height: 40,
    borderRadius: 10,
    borderColor: "lightgray",
    borderWidth: 1,
    backgroundColor: "#f4f4f4",
    justifyContent: "center",
    alignItems: "center",
  },
  tab: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginHorizontal: 20,
    width: 70,
    height: 30,
    borderRadius: 10,
    backgroundColor: "pink",
  },
  card: {
    width: "90%",
    marginLeft: "5%",
    height: 100,
    borderRadius: 10,
    backgroundColor: "yellow",
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;
