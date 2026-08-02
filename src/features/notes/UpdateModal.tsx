import { useUpdateNote } from "@/hooks/query";
import { commonStyles } from "@/styles/commonStyles";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import CommonModal from "../../components/CommonModal";

type params = {
  isOpen: boolean;
  close: () => void;
  initialTask: any;
};

const UpdateModal = ({ isOpen, close, initialTask }: params) => {
  const [note, setNote] = useState<any>(initialTask);
  const updateMutation = useUpdateNote();

  useEffect(() => setNote(initialTask), [initialTask]);

  async function handleUpdateNote() {
    if (!note.id) {
      Alert.alert("No id detected");
      return;
    }

    if (!note?.title.trim()) {
      Alert.alert("Enter title to continue.");
      return;
    }

    updateMutation.mutate(note, { onSuccess: () => close() });
  }

  return (
    <CommonModal
      isOpen={isOpen}
      close={close}
      title="Update Task"
      //   containerStyle={styles.container}
    >
      <View style={styles.container}>
        <View>
          <Text style={commonStyles.inputlabel}>Title</Text>
          <TextInput
            placeholder="Task title..."
            value={note?.title}
            onChangeText={(text) =>
              setNote((prev: any) => ({ ...prev, title: text }))
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
            value={note?.description}
            onChangeText={(text) =>
              setNote((prev: any) => ({ ...prev, description: text }))
            }
            style={commonStyles.textBox}
          />
        </View>

        <Pressable style={commonStyles.button} onPress={handleUpdateNote}>
          <Text style={commonStyles.buttonText}>UPDATE</Text>
        </Pressable>
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
