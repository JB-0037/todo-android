import { useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  const [todo, setTodo] = useState<string>();
  const [todos, setTodos] = useState<string[]>([]);

  function addTodo() {
    if (todo) {
      setTodos([...todos, todo]);
      setTodo("");
      Keyboard.dismiss();
    }
  }

  return (
    <View style={styles.main}>
      <View style={styles.submitBlock}>
        <TextInput
          style={styles.input}
          onChangeText={(e: string) => setTodo(e)}
          value={todo}
          maxLength={50}
        />
        <Pressable style={styles.submit} onPress={addTodo}>
          <Text>+</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.todos}>
        {todos.map((todo, index) => (
          <Text key={index}>{todo}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    padding: 10,
    display: "flex",
    flexDirection: "column",
    gap: "10"
  },
  submitBlock: {
    display: "flex",
    flexDirection: "row",
    gap: "10"
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
    flex: 1
  },
  submit: {
    backgroundColor: "lightblue",
    width: 40,
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  todos: {
    height: "90%"
  }
});
