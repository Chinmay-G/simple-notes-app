import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { supabase } from "../lib/supabase";

const Home = () => {
  const { userEmail } = useLocalSearchParams();
  const queryClient = useQueryClient();

  const [newTask, setNewTask] = useState<any>({ title: "", description: "" });
  // const [tasks, setTasks] = useState<any>([]);

  const {
    data: tasks,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const addMutation = useMutation({
    mutationFn: addNewTask,
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      Alert.alert("Task Added !");
      setNewTask({ title: "", description: "" });
    },
    onError: (err) => {
      console.error(err?.message);
    },
  });

  function handleCreateTask() {
    if (!newTask?.title) {
      Alert.alert("Enter Task title");
      return;
    }

    addMutation.mutate();
  }

  // TESTING
  // useEffect(() => {
  //   getTodos();
  // }, []);

  // useEffect(() => {
  //   const channel = supabase.channel("tasks-channel");
  //   channel
  //     .on(
  //       "postgres_changes",
  //       { event: "INSERT", schema: "public", table: "tasks" },
  //       (payload) => {
  //         const newTask = payload.new;
  //         setTasks((prev: any) => [...prev, newTask]);
  //       },
  //     )
  //     .subscribe((status) => {
  //       console.log("Subscription: ", status);
  //     });

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, []);

  async function getTodos() {
    const { data, error } = await supabase.from("tasks").select();

    if (error) {
      console.error("Error fetching tasks:", error.message);
      throw new Error(`Error fetching tasks: ${error?.message}`);
    }
    return data;
    // if (data) {
    //   console.log(data);
    //   setTasks(data);
    // }
  }

  async function addNewTask() {
    // if (!newTask?.title) {
    //   Alert.alert("Enter Task title");
    //   return;
    // }

    const { data, error }: any = await supabase
      .from("tasks")
      .insert({ ...newTask, email: userEmail })
      .select()
      .single();

    if (error) {
      throw new Error(`Error adding task: ${error?.message}`);
    }

    return data;

    // Alert.alert("Task Added !");
    // setNewTask({ title: "", description: "" });
  }

  console.log("TASKS: ", tasks);

  async function updateTask(id: any, task: typeof newTask) {
    if (!id) {
      Alert.alert("No id detected");
      return;
    }

    const { data, error }: any = await supabase
      .from("tasks")
      .update(task)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }

    Alert.alert("Task Updated !");
    console.log("Updated data: ", data);
    // const updatedTasks = tasks.map((item: any) =>
    //   item.id === id ? data : item,
    // );
    // setTasks(updatedTasks);
    await getTodos();
  }

  async function deleteTask(id: any) {
    if (!id) {
      Alert.alert("No id detected");
      return;
    }

    const { error }: any = await supabase.from("tasks").delete().eq("id", id);

    if (error) {
      console.error("Error deleting task:", error.message);
      return;
    }

    Alert.alert("Task Deleted !");
    // await getTodos();
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  async function logout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error signing out: ", error?.message);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        gap: 8,
      }}
    >
      <Pressable
        style={[styles.button, { alignSelf: "flex-end" }]}
        onPress={logout}
      >
        <Text style={styles.buttonText}>LOGOUT</Text>
      </Pressable>

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

        {/* <Pressable style={styles.button} onPress={addNewTask}> */}
        <Pressable style={styles.button} onPress={handleCreateTask}>
          <Text style={styles.buttonText}>ADD</Text>
        </Pressable>
      </View>

      {/* <Pressable onPress={() => router.navigate("/auth")}>
        <Text>GO TO AUTH</Text>
      </Pressable> */}

      {/* Tasks List */}
      <Text style={{ fontSize: 18, fontWeight: 700, marginTop: 8 }}>
        Tasks List
      </Text>

      {isPending && <ActivityIndicator size={30} color={"#000"} />}
      {isError && <Text>Error fetching tasks</Text>}

      {tasks && (
        <>
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
                <View style={styles.taskOptions}>
                  <MaterialDesignIcons
                    name="delete-alert"
                    size={24}
                    color="crimson"
                    onPress={async () => await deleteTask(item?.id)}
                  />
                  <MaterialDesignIcons
                    name="text-box-edit"
                    size={24}
                    color="navy"
                    onPress={async () => await updateTask(item?.id, item)}
                  />
                </View>
              </View>
            )}
          />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  tasksContainer: {
    width: "100%",
    paddingHorizontal: 8,
    display: "flex",
    gap: 10,
  },
  taskContainer: {
    minWidth: "80%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    // backgroundColor: "#323232",
    backgroundColor: "#ffff",
  },
  taskDetailsContainer: {
    width: "90%",
    padding: 4,
    display: "flex",
    gap: 6,
  },
  taskTitle: {
    fontWeight: 600,
    fontSize: 16,
    // color: "#ffff",
  },
  taskOptions: {
    display: "flex",
    gap: 6,
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
