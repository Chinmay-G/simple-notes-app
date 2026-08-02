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
          {/* <ScrollView
            style={[{ flex: 1 }]}
            contentContainerStyle={[styles.container, containerStyle]}
          > */}
          <ScrollView
            contentContainerStyle={[styles.scrollContent, containerStyle]}
            keyboardShouldPersistTaps="handled"
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
    backgroundColor: "#030303cf",
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 99,
  },
  modal: {
    backgroundColor: "white",
    // minWidth: "50%",
    // maxWidth: "90%",
    width: "80%",
    minHeight: "30%",
    maxHeight: "70%",
    // height: 230,
    borderRadius: 12,
    position: "relative",
    zIndex: 100,
    boxShadow: "0px 2px 6px black",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },

    padding: 2,
  },
  scrollContent: {
    // paddingBottom: 10, // extra space at bottom
  },
  closeButton: {
    position: "absolute",
    top: -25,
    right: -20,
    backgroundColor: "white",
    borderRadius: 5,
    boxShadow: "0px 1.5px 4px black",
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
    // height: "80%",
    // flex: 1,
  },
});
