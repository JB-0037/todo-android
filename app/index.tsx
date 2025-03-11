import { Stack } from "expo-router";
import { useState } from "react";
import { Keyboard, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

type Todo = {
  id: string;
  label: string;
  isCompleted: boolean;
};

export default function Index() {
  const [todo, setTodo] = useState<string>();
  const [todos, setTodos] = useState<Todo[]>([]);

  function addTodo() {
    if (todo) {
      setTodos([...todos, { id: Date.now().toString(), label: todo, isCompleted: false }]);
      setTodo("");
      Keyboard.dismiss();
    }
  }

  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <View style={styles.main}>
      <Stack.Screen
        options={{
          title: 'Accueil',
          headerTitleStyle: {
            fontWeight: 'bold',
          }
        }}
      />

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

      <ScrollView style={styles.scrollview}>
        <View style={styles.todos}>
          {todos.map((todo) => (
            <View style={styles.todo} key={todo.id}>
              <Text >{todo.label}</Text>
              <Pressable onPress={() => deleteTodo(todo.id)}>
                <Text style={{ fontWeight: "bold" }}>X</Text>
              </Pressable>
            </View>
          ))}
        </View>
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
  todo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "black",
    backgroundColor: "white",
    padding: 10
  },
  scrollview: {
    height: "90%",
  },
  todos: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  }
});
