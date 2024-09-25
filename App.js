import { useState, useEffect } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setComments(response.data);
      })
      .catch((e) => {
        console.error("Error fetching data: ", e);
      });
  });

  // Item renderer for FlatList
  const renderItem = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.completed}>{item.completed ? 'Completed' : 'Incomplete'}</Text>
    </View>
  );

  // Key extractor for FlatList
  const keyExtractor = (item) => item.id.toString();

  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView>
        <FlatList
          data={comments}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  commentItem: {
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    padding: 5,
  },
  completed: {
    padding: 5,
  }
});