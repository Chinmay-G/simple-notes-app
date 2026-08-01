import { MaterialDesignIcons } from "@react-native-vector-icons/material-design-icons";
import React, { ReactNode } from "react";
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type params = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
  title?: string;
  containerStyle?: ViewStyle;
};

const CommonModal = ({
  isOpen,
  close,
  children,
  title,
  containerStyle,
}: params) => {
  return (
    <Modal visible={isOpen} onRequestClose={close} transparent>
      {/* Overlay */}
      <View style={styles.overlay}>
        {/* Modal */}
        <View style={styles.modal}>
          <MaterialDesignIcons
            name="close"
            size={22}
            color="black"
            onPress={close}
            style={styles.closeButton}
          />
          {title && <Text style={styles.heading}>{title}</Text>}
          <ScrollView
            style={[{ flex: 1, height: "100%" }]}
            contentContainerStyle={[styles.container, containerStyle]}
          >
            {children}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default CommonModal;

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: "#09090997",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  modal: {
    backgroundColor: "white",
    minWidth: "50%",
    maxWidth: "90%",
    minHeight: "10%",
    maxHeight: "80%",
    height: 230,
    borderRadius: 10,
    position: "relative",
    zIndex: 100,
  },
  closeButton: {
    position: "absolute",
    top: -25,
    right: -20,
    backgroundColor: "white",
    borderRadius: 5,
  },
  heading: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: "center",
    padding: 4,
    paddingHorizontal: 8,
  },
  container: {
    padding: 8,
    flex: 1,
  },
});
