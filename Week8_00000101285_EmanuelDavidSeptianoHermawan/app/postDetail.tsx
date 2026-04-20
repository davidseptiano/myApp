import { getPostDetail, getUserDetail, getComments } from "@/services/api";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, View, ScrollView } from "react-native";

export default function PostDetail() {
  const { id, userId } = useLocalSearchParams<{
    id: string;
    userId: string;
  }>();

  const [user, setUser] = useState<any>(null);
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    if (id) {
      getPostDetailData();
      getUserData();
      getCommentsData(); // ✅ INI YANG KAMU KURANG
    }
  }, []);

  const getUserData = async () => {
    try {
      const res = await getUserDetail(Number(userId));
      if (res.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.log("Error user:", error);
    }
  };

  const getPostDetailData = async () => {
    try {
      const res = await getPostDetail(Number(id));
      if (res.status === 200) {
        setPost(res.data);
      }
    } catch (error) {
      console.log("Error post:", error);
    }
  };

  const getCommentsData = async () => {
    try {
      const res = await getComments(Number(id));
      if (res.status === 200) {
        setComments(res.data);
      }
    } catch (error) {
      console.log("Error comments:", error);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: "white" }}
      contentContainerStyle={{ padding: 20 }}
    >
      {/* POST */}
      <Text style={{ fontWeight: "bold", fontSize: 18, textAlign: "center" }}>
        {post?.title}
      </Text>

      <Text style={{ marginTop: 10, textAlign: "center" }}>
        {post?.body}
      </Text>

      {/* USER */}
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold" }}>Post Created By</Text>
        <Text>Name: {user?.name}</Text>
        <Text>Email: {user?.email}</Text>
      </View>

      {/* COMMENTS */}
      <View style={{ marginTop: 30 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          Comments
        </Text>

        {comments.map((comment) => (
          <View
            key={comment.id}
            style={{
              marginTop: 10,
              padding: 10,
              borderWidth: 1,
              borderRadius: 8,
              backgroundColor: "#f9f9f9",
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              {comment.name}
            </Text>
            <Text style={{ color: "gray" }}>
              {comment.email}
            </Text>
            <Text style={{ marginTop: 5 }}>
              {comment.body}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}