import React from "react";
import { Modal, ScrollView, StyleSheet, View } from "react-native";

type params = {
  isOpen: boolean;
  close: () => void;
};

const CommonModal = ({ isOpen, close }: params) => {
  return (
    <Modal visible={isOpen} onRequestClose={close}>
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Modal */}
        <View style={styles.modal}>
          <ScrollView contentContainerStyle={styles.container}></ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  overlay: {},
  modal: {},
  container: {},
});
