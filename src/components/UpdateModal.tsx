import { updateNote } from "@/services/notes";
import { commonStyles } from "@/styles/commonStyles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updateNote,
    onSuccess: (data) => {
      Alert.alert("Note Updated !");
      console.log("Updated data: ", data);
      queryClient.invalidateQueries({ queryKey: ["todos"] });
      close();
    },
    onError: (err) => console.error(err?.message),
  });

  async function handleUpdateTask() {
    if (!task.id) {
      Alert.alert("No id detected");
      return;
    }

    if (!task?.title.trim()) {
      Alert.alert("Enter title to continue.");
      return;
    }

    updateMutation.mutate(task);
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
