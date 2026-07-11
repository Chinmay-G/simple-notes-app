import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

export default function Index() {
  const [newTask, setNewTask] = useState<any>({ title: "", description: "" });
  const [tasks, setTasks] = useState<any>([]);

  // console.log(supabaseUrl, supabasePublishableKey);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const { data, error } = await supabase.from("tasks").select();

    if (error) {
      console.error("Error fetching tasks:", error.message);
      return;
    }

    if (data && data.length > 0) {
      console.log(data);
      setTasks(data);
    }
  };

  async function addNewTask() {
    if (!newTask?.title) {
      Alert.alert("Enter Task title");
      return;
    }

    const { error }: any = await supabase
      .from("tasks")
      .insert(newTask)
      .single();

    if (error) {
      console.error("Error adding task:", error.message);
      return;
    }

    Alert.alert("Task Added !");
    await getTodos();
  }

  async function deleteTask(id: any) {
    if (!newTask?.title) {
      Alert.alert("Enter Task title");
      return;
    }

    const { error }: any = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }

    Alert.alert("Task Deleted !");
    await getTodos();
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        gap: 12,
      }}
    >
      {/* Add New Task */}
      <View style={styles.addTaskContainer}>
        <Text style={styles.sectionHeading}>Add Task</Text>
        <View>
          <Text style={styles.inputlabel}>Title</Text>
          <TextInput
            placeholder="Task title..."
            value={newTask?.title}
            onChangeText={(text) =>
              setNewTask((prev: any) => ({ ...prev, title: text }))
            }
            style={styles.textBox}
          />
        </View>
        <View>
          <Text style={styles.inputlabel}>Description</Text>
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Task description..."
            value={newTask?.description}
            onChangeText={(text) =>
              setNewTask((prev: any) => ({ ...prev, description: text }))
            }
            style={styles.textBox}
          />
        </View>

        <Pressable style={styles.button} onPress={addNewTask}>
          <Text style={styles.buttonText}>ADD</Text>
        </Pressable>
      </View>

      {/* Tasks List */}
      <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
        Tasks List
      </Text>
      <FlatList
        data={tasks}
        contentContainerStyle={styles.tasksContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.taskContainer}>
            <View key={item.id} style={styles.taskDetailsContainer}>
              <Text style={styles.taskTitle}>{item.title}</Text>
              <Text>{item.description}</Text>
            </View>
            <View>
              <Pressable></Pressable>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tasksContainer: {
    flexDirection: "row",
    gap: 4,
  },
  taskDetailsContainer: {
    display: "flex",
    gap: 10,
  },
  taskContainer: {
    minWidth: "80%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    display: "flex",
    gap: 6,
    // backgroundColor: "#323232",
    backgroundColor: "#ffff",
  },
  taskTitle: {
    fontWeight: 600,
    fontSize: 16,
    // color: "#ffff",
  },
  addTaskContainer: {
    minWidth: "70%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    display: "flex",
    gap: 12,
    backgroundColor: "#ffff",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 600,
  },
  textBox: {
    padding: 4,
    borderWidth: 0.5,
    borderRadius: 6,
  },
  inputlabel: {
    fontWeight: 500,
  },
  button: {
    padding: 8,
    backgroundColor: "#000",
    borderRadius: 6,
    boxShadow: "0px 1px 2px gray",
  },
  buttonText: {
    color: "#ffff",
    fontWeight: 800,
    fontSize: 16,
    textAlign: "center",
  },
});
