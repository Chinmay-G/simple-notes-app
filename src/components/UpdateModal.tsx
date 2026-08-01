import { useUpdateNote } from "@/hooks/query";
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
import CommonModal from "./CommonModal";

type params = {
  isOpen: boolean;
  close: () => void;
  initialTask: any;
};

const UpdateModal = ({ isOpen, close, initialTask }: params) => {
  const [task, setTask] = useState<any>(initialTask);
  const updateMutation = useUpdateNote();

  async function handleUpdateTask() {
    if (!task.id) {
      Alert.alert("No id detected");
      return;
    }

    if (!task?.title.trim()) {
      Alert.alert("Enter title to continue.");
      return;
    }

    updateMutation.mutate(task, { onSuccess: () => close() });
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
            value={task?.title}
            onChangeText={(text) =>
              setTask((prev: any) => ({ ...prev, title: text }))
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
            value={task?.description}
            onChangeText={(text) =>
              setTask((prev: any) => ({ ...prev, description: text }))
            }
            style={commonStyles.textBox}
          />
        </View>

        <Pressable style={commonStyles.button} onPress={handleUpdateTask}>
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
