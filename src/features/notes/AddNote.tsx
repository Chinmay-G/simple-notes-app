import CommonButton from "@/components/CommonButton";
import { useCreateNote } from "@/hooks/query";
import { commonStyles } from "@/styles/commonStyles";
import { NoteInput } from "@/types/notes";
import * as burnt from "burnt";
import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const AddNote = ({ userEmail }: { userEmail: string }) => {
  const [newNote, setNewNote] = useState<NoteInput>({
    title: "",
    description: "",
  });
  const [showAddNote, setShowAddNote] = useState(false);

  const addMutation = useCreateNote();

  function handleCreateNote() {
    if (!newNote?.title) {
      burnt.toast({ title: "Enter Note title", preset: "error" });
      return;
    }
    addMutation.mutate(
      { newNote: newNote, userEmail: userEmail },
      { onSuccess: () => setNewNote({ title: "", description: "" }) },
    );
  }

  return (
    <>
      <CommonButton
        title={showAddNote ? "Add Note -" : "Add Note +"}
        onPress={() => setShowAddNote((prev) => !prev)}
        style={{ alignSelf: "flex-end" }}
      />

      {showAddNote && (
        <View style={styles.addTaskContainer}>
          <Text style={styles.sectionHeading}>Add Note</Text>
          <View>
            <Text style={commonStyles.inputlabel}>Title</Text>
            <TextInput
              placeholder="Title"
              value={newNote?.title}
              onChangeText={(text) =>
                setNewNote((prev) => ({ ...prev, title: text }))
              }
              style={commonStyles.textBox}
            />
          </View>
          <View>
            <Text style={commonStyles.inputlabel}>Description</Text>
            <TextInput
              multiline
              numberOfLines={3}
              placeholder="Description..."
              value={newNote?.description}
              onChangeText={(text) =>
                setNewNote((prev) => ({ ...prev, description: text }))
              }
              style={commonStyles.textBox}
            />
          </View>

          {/* <Pressable style={commonStyles.button} onPress={handleCreateNote}>
        <Text style={commonStyles.buttonText}>ADD</Text>
      </Pressable> */}
          <CommonButton
            title="ADD"
            onPress={handleCreateNote}
            loading={addMutation.isPending}
          />
        </View>
      )}
    </>
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
    fontSize: 18,
    fontWeight: 600,
  },
});
