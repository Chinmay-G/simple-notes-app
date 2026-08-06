import CommonButton from "@/components/CommonButton";
import CommonModal from "@/components/CommonModal";
import { useDeleteNote } from "@/hooks/query";
import { Note } from "@/types/notes";
import * as burnt from "burnt";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const DeleteConfirmationModal = ({
  isOpen,
  close,
  note,
}: {
  isOpen: boolean;
  close: () => void;
  note: Note;
}) => {
  const deleteMutation = useDeleteNote();

  function handleDeleteNote() {
    if (!note?.id) {
      burnt.toast({ title: "No id detected !" });
      return;
    }
    deleteMutation.mutate(note?.id);
  }

  return (
    <CommonModal isOpen={isOpen} close={close}>
      <View style={styles.container}>
        <Text style={styles.message}>
          Are you sure you want to delete the note ?
        </Text>

        <View style={styles.note}>
          <Text style={styles.title}>{note?.title}</Text>
          <Text style={styles.description}>{note?.description}</Text>
        </View>

        <View style={styles.buttonsContainer}>
          <CommonButton
            title="Cancel"
            style={styles.cancelButton}
            textStyle={styles.cancelButtonText}
            onPress={close}
          />
          <CommonButton
            title="DELETE"
            style={styles.deleteButton}
            onPress={handleDeleteNote}
            loading={deleteMutation.isPending}
          />
        </View>
      </View>
    </CommonModal>
  );
};

export default DeleteConfirmationModal;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 16,
    padding: 12,
    // backgroundColor: "lightgreen",
    // justifyContent: "center",
    // borderRadius: 16,
  },

  message: {
    fontSize: 22,
    fontWeight: 600,
    textAlign: "center",
  },

  note: {
    display: "flex",
    borderRadius: 12,
    boxShadow: "0px 1px 2px gray",
    backgroundColor: "whitesmoke",
    padding: 8,
    paddingHorizontal: 12,
    gap: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 500,
  },
  description: {},

  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  cancelButton: {
    backgroundColor: "whitesmoke",
    borderWidth: 1.5,
    minWidth: "35%",
  },
  cancelButtonText: { color: "black" },
  deleteButton: { backgroundColor: "crimson", minWidth: "35%" },
});
