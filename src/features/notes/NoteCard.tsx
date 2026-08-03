import MaterialDesignIcons from "@react-native-vector-icons/material-design-icons";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import UpdateModal from "./UpdateModal";

const NoteCard = ({ note: item }: { note: any }) => {
  const [updateTask, setUpdateTask] = useState<any>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<any>(null);

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
            // onPress={() => handleDeleteNote(item?.id)}
            onPress={() => setIsDeleteModalOpen(item)}
          />
          <MaterialDesignIcons
            name="text-box-edit"
            size={24}
            color="navy"
            onPress={() => setUpdateTask(item)}
          />
        </View>
      </View>

      {/* {updateTask && ( */}
      <UpdateModal
        isOpen={updateTask ? true : false}
        close={() => setUpdateTask(null)}
        initialTask={updateTask}
      />
      {/* )} */}

      {setIsDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen ? true : false}
          close={() => setIsDeleteModalOpen(false)}
          note={isDeleteModalOpen}
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
    boxShadow: "0px 1.5px 2px gray",

    alignItems: "center",
    marginVertical: 4,
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
