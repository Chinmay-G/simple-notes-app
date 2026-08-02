import { useDeleteNote } from "@/hooks/query";
import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React, { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import UpdateModal from "./UpdateModal";

const NoteCard = ({ note: item }: { note: any }) => {
  const [updateTask, setUpdateTask] = useState<any>(null);

  const deleteMutation = useDeleteNote();

  function handleDeleteNote(id: any) {
    if (!id) {
      Alert.alert("No id detected !");
      return;
    }
    deleteMutation.mutate(id);
  }

  return (
    <>
      <View key={item.id} style={styles.card}>
        <View key={item.id} style={styles.detailsContainer}>
          <Text style={styles.taskTitle}>{item.title}</Text>
          <Text>{item.description}</Text>
        </View>
        <View style={styles.taskOptions}>
          <MaterialDesignIcons
            name="delete-alert"
            size={24}
            color="crimson"
            onPress={() => handleDeleteNote(item?.id)}
          />
          <MaterialDesignIcons
            name="text-box-edit"
            size={24}
            color="navy"
            onPress={() => setUpdateTask(item)}
          />
        </View>
      </View>

      {updateTask && (
        <UpdateModal
          isOpen={updateTask ? true : false}
          close={() => setUpdateTask(null)}
          initialTask={updateTask}
        />
      )}
    </>
  );
};

export default NoteCard;

const styles = StyleSheet.create({
  card: {
    minWidth: "80%",
    padding: 12,
    // borderWidth: 1.5,
    borderRadius: 8,
    flexDirection: "row",
    gap: 4,
    // backgroundColor: "#323232",
    backgroundColor: "#ffff",
    boxShadow: "0px 1.5px 2px whitesmoke",
  },
  detailsContainer: {
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
});
