import Header from "@/components/Header";
import AddNote from "@/features/notes/AddNote";
import NoteCard from "@/features/notes/NoteCard";
import { useNotes } from "@/hooks/query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";

const Home = () => {
  const { userEmail } = useLocalSearchParams();

  // const [tasks, setTasks] = useState<any>([]);

  const { data: tasks, isPending, isError } = useNotes();

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

  console.log("TASKS: ", tasks);

  return (
    <>
      <Header userEmail={userEmail} />
      <View style={styles.screen}>
        {/* Add New Task */}
        <AddNote userEmail={userEmail} />

        {/* Tasks List */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesHeading}>Notes</Text>
          {isPending && <ActivityIndicator size={30} color={"#000"} />}
          {isError && <Text>Error fetching tasks</Text>}

          {tasks && (
            <FlatList
              data={tasks}
              contentContainerStyle={styles.tasksContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <NoteCard note={item} />}
            />
          )}
        </View>
      </View>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    gap: 18,
  },
  notesContainer: { flex: 1, alignItems: "center", width: "100%" },
  notesHeading: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 12,
    backgroundColor: "#3b3b3bee",
    width: "94%",
    padding: 8,
    paddingHorizontal: "15%",
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    color: "white",
    boxShadow: "inset 1px 1px 3px black",
  },
  tasksContainer: {
    width: "100%",
    padding: 12,
    display: "flex",
    gap: 12,
    backgroundColor: "#3b3b3bee",
    boxShadow: "inset 1px 1px 4px black",
    borderRadius: 12,
  },
});
