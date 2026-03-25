import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },

  card: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 8,
    padding: 8,
    width: 325,
    marginVertical: 8,
  },

  cardContent: { // ✅ TAMBAHAN
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  textContainer: { // ✅ TAMBAHAN
    marginLeft: 10,
  },

  avatar: {
    width: 75,
    height: 75,
    borderRadius: 999,
  },

  boldText: {
    fontWeight: "bold",
  },
});

export default styles;