import CommonButton from "@/components/CommonButton";
import { useUpdateNote } from "@/hooks/query";
import { commonStyles } from "@/styles/commonStyles";
import { Note } from "@/types/notes";
import * as burnt from "burnt";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import CommonModal from "../../components/CommonModal";

type params = {
  isOpen: boolean;
  close: () => void;
  initialTask: Note;
};

const UpdateModal = ({ isOpen, close, initialTask }: params) => {
  const [note, setNote] = useState<Note>(initialTask);
  const updateMutation = useUpdateNote();

  useEffect(() => setNote(initialTask), [initialTask]);

  async function handleUpdateNote() {
    if (!note.id) {
      burnt.toast({ title: "No id detected", preset: "error" });
      return;
    }

    if (!note?.title.trim()) {
      burnt.toast({ title: "Enter title to continue.", preset: "error" });
      return;
    }

    updateMutation.mutate(note, { onSuccess: () => close() });
  }

  return (
    <CommonModal
      isOpen={isOpen}
      close={close}
      title="Update Note"
      //   containerStyle={styles.container}
    >
      <View style={styles.container}>
        <View>
          <Text style={commonStyles.inputlabel}>Title</Text>
          <TextInput
            placeholder="Note title..."
            value={note?.title}
            onChangeText={(text) =>
              setNote((prev) => ({ ...prev, title: text }))
            }
            style={commonStyles.textBox}
          />
        </View>
        <View>
          <Text style={commonStyles.inputlabel}>Description</Text>
          <TextInput
            multiline
            numberOfLines={3}
            placeholder="Note description..."
            value={note?.description}
            onChangeText={(text) =>
              setNote((prev) => ({ ...prev, description: text }))
            }
            style={commonStyles.textBox}
          />
        </View>

        {/* <Pressable style={commonStyles.button} onPress={handleUpdateNote}>
          <Text style={commonStyles.buttonText}>UPDATE</Text>
        </Pressable> */}
        <CommonButton
          title="UPDATE"
          onPress={handleUpdateNote}
          loading={updateMutation.isPending}
        />
      </View>
    </CommonModal>
  );
};

export default UpdateModal;

const styles = StyleSheet.create({
  container: {
    minWidth: "70%",
    padding: 12,
    // borderWidth: 1,
    // borderRadius: 12,
    display: "flex",
    gap: 12,
  },
});
