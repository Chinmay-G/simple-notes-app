import CommonButton from "@/components/CommonButton";
import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import Header from "@/components/Header";
import LoadingView from "@/components/LoadingView";
import AddNote from "@/features/notes/AddNote";
import NoteCard from "@/features/notes/NoteCard";
import { useNotes } from "@/hooks/query";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

const Home = () => {
  const { userEmail } = useLocalSearchParams();
  const [showAddNote, setShowAddNote] = useState(false);

  const { data: notes, isPending, isError, refetch } = useNotes();

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

  console.log("NOTES: ", notes);

  return (
    <>
      <Header userEmail={userEmail} />
      <View style={styles.screen}>
        <CommonButton
          title={showAddNote ? "Add Note -" : "Add Note +"}
          onPress={() => setShowAddNote((prev) => !prev)}
          style={{ alignSelf: "flex-end" }}
        />
        {/* Add New Note */}
        {showAddNote && <AddNote userEmail={userEmail} />}

        {/* Notes List */}
        <View style={styles.notesContainer}>
          <Text style={styles.notesHeading}>Notes</Text>

          <View style={{ marginTop: 8, display: "flex", gap: 12 }}>
            {isPending && <LoadingView />}
            {isError && <ErrorState reload={refetch} />}
            {notes && notes?.length === 0 && <EmptyState />}
          </View>

          {/* {notes && (
            <FlatList
              data={notes}
              contentContainerStyle={styles.tasksContainer}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => <NoteCard note={item} />}
            />
          )} */}
          {notes && notes?.length > 0 && (
            <ScrollView contentContainerStyle={styles.tasksContainer}>
              {notes?.map((item) => (
                <NoteCard key={item?.id} note={item} />
              ))}
            </ScrollView>
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
    backgroundColor: "white",
  },
  notesContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    backgroundColor: "whitesmoke",
    boxShadow: "inset 1px 1px 4px black",
    borderRadius: 6,
  },
  notesHeading: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 12,
    backgroundColor: "white",
    width: "94%",
    padding: 8,
    paddingHorizontal: "15%",
    borderRadius: 4,
    // borderTopRightRadius: 8,
    // borderTopLeftRadius: 8,
    // color: "white",
    boxShadow: "inset 1px -1px 2px black",
  },
  tasksContainer: {
    width: "100%",
    padding: 12,
    display: "flex",
    gap: 12,
    // backgroundColor: "whitesmoke",
    // boxShadow: "inset 1px 1px 4px black",
    borderRadius: 12,
  },
});
