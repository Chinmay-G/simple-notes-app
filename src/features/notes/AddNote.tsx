import { useCreateNote } from "@/hooks/query";
import { commonStyles } from "@/styles/commonStyles";
import React, { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

const AddNote = ({ userEmail }: any) => {
  const [newTask, setNewTask] = useState<any>({ title: "", description: "" });

  const addMutation = useCreateNote();

  function handleCreateTask() {
    if (!newTask?.title) {
      Alert.alert("Enter Note title");
      return;
    }
    addMutation.mutate(
      { newNote: newTask, userEmail: userEmail as string },
      { onSuccess: () => setNewTask({ title: "", description: "" }) },
    );
  }

  return (
    <View style={styles.addTaskContainer}>
      <Text style={styles.sectionHeading}>Add Task</Text>
      <View>
        <Text style={commonStyles.inputlabel}>Title</Text>
        <TextInput
          placeholder="Task title..."
          value={newTask?.title}
          onChangeText={(text) =>
            setNewTask((prev: any) => ({ ...prev, title: text }))
          }
          style={commonStyles.textBox}
        />
      </View>
      <View>
        <Text style={commonStyles.inputlabel}>Description</Text>
        <TextInput
          multiline
          numberOfLines={3}
          placeholder="Task description..."
          value={newTask?.description}
          onChangeText={(text) =>
            setNewTask((prev: any) => ({ ...prev, description: text }))
          }
          style={commonStyles.textBox}
        />
      </View>

      {/* <Pressable style={commonStyles.button} onPress={createNote}> */}
      <Pressable style={commonStyles.button} onPress={handleCreateTask}>
        <Text style={commonStyles.buttonText}>ADD</Text>
      </Pressable>
    </View>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  addTaskContainer: {
    minWidth: "90%",
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    display: "flex",
    gap: 12,
    backgroundColor: "#ffff",
    boxShadow: "0px 1px 4px black",
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: 600,
  },
});
