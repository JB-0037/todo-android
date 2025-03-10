import { useState } from "react";
import { StyleProp, StyleSheet, Text, TextInput, TextStyle, View } from "react-native";

export default function Index() {
  const [todo, setTodo] = useState<string>();


  return (
    <View>
      <View>
        <TextInput
          style={styles.input}
          onChangeText={(e: string) => setTodo(e)}
          value={todo}
          maxLength={50}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: "black",
    borderWidth: 1,
    borderStyle: "solid",
  }
});
