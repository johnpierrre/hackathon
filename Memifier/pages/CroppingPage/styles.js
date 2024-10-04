// styles.js
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "#222",
    padding: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#888",
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 12,
  },

  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    width: "100%",
    paddingHorizontal: 10,
  },
  videoContainer: {
    marginVertical: 10,
    alignItems: "center",
  },
  video: {
    flex: 1,
    alignSelf: "stretch",
  },
});
