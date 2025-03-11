import { Stack } from "expo-router";
import { useState } from "react";
import { Image, Keyboard, Pressable, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

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

  function updateTodoStatus(id: string) {
    setTodos(todos.map((todo) => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <StatusBar
          animated={true}
          backgroundColor={"black"}
        />

        <View style={styles.main}>
          <Stack.Screen
            options={{
              title: "Todo",
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
              <Image source={require("../assets/images/plus.png")} style={{ width: 20, height: 20 }} />
            </Pressable>
          </View>

          <ScrollView style={styles.scrollview}>
            <View style={styles.todos}>
              {todos.map((todo) => (
                <View style={styles.todo} key={todo.id}>
                  <View style={{ display: "flex", flexDirection: "row", gap: 5, alignItems: "center" }}>
                    {
                      todo.isCompleted
                      ? <TouchableOpacity onPress={() => updateTodoStatus(todo.id)}>
                          <Image source={require("../assets/images/checkbox-checked.png")} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                        : <TouchableOpacity onPress={() => updateTodoStatus(todo.id)}>
                          <Image source={require("../assets/images/checkbox-unchecked.png")} style={{ width: 30, height: 30 }} />
                        </TouchableOpacity>
                    }
                    
                    <Text style={todo.isCompleted ? styles.todoStrikedLabel : {
                      width: 230
                    }}>{todo.label}</Text>
                  </View>
                  <Pressable onPress={() => deleteTodo(todo.id)} style={{ padding: 5 }}>
                    <Image source={require("../assets/images/trash.png")} style={{ width: 30, height: 30 }} />
                  </Pressable>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
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
    backgroundColor: "white",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 8,
    height: 50,
    flex: 1
  },
  submit: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderStyle: "solid",
    borderRadius: 8,
    width: 50,
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
    padding: 10,
    alignItems: "center"
  },
  scrollview: {
    height: "90%",
  },
  todos: {
    display: "flex",
    flexDirection: "column",
    gap: 10
  },
  todoStrikedLabel: {
    textDecorationLine: "line-through",
    color: "#b0b0b0",
    width: 230
  }
});
