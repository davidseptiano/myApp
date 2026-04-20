import { postData } from "@/services/api";
import { router } from "expo-router";
import { useState } from "react";
import { TextInput, View, Text, Pressable } from "react-native";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await postData({
        title,
        body,
        userId: 1,
      });

      if (res.status === 201) {
        console.log("Success:", res.data);
        router.back();
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: "white",
        justifyContent: "center",
      }}
    >
      {/* TITLE */}
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Title</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Enter title..."
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 15,
        }}
      />

      {/* BODY */}
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>Body</Text>
      <TextInput
        value={body}
        onChangeText={setBody}
        placeholder="Enter body..."
        multiline
        numberOfLines={4}
        style={{
          borderWidth: 1,
          borderRadius: 8,
          padding: 10,
          marginBottom: 20,
          height: 100,
          textAlignVertical: "top",
        }}
      />

      {/* BUTTON SUBMIT */}
      <Pressable
        onPress={handleSubmit}
        style={{
          backgroundColor: "#007AFF",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Submit
        </Text>
      </Pressable>

      {/* BUTTON CANCEL */}
      <Pressable
        onPress={() => router.back()}
        style={{
          backgroundColor: "#ccc",
          padding: 15,
          borderRadius: 10,
          alignItems: "center",
        }}
      >
        <Text style={{ fontWeight: "bold" }}>Cancel</Text>
      </Pressable>
    </View>
  );
}