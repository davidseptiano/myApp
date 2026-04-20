import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { getPosts } from "@/services/api";

export default function Index() {
  const [posts, setPosts] = useState<any[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await getPosts();
      if (res.status === 200) {
        setPosts(res.data);
      }
    } catch (error) {
      console.log("Error fetching posts:", error);
    }
  };

  const goToDetail = (post: any) => {
    router.push({
      pathname: "/postDetail",
      params: {
        id: post.id,
        userId: post.userId,
      },
    });
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      
      {/* LIST POSTS */}
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 100, // biar ga ketutup button
        }}
      >
        {posts.length === 0 ? (
          <Text
            style={{
              textAlign: "center",
              color: "gray",
              marginTop: 20,
            }}
          >
            No posts available
          </Text>
        ) : (
          posts.map((post) => (
            <Pressable
              key={post.id}
              onPress={() => goToDetail(post)}
              style={{
                padding: 12,
                borderWidth: 1,
                borderRadius: 10,
                marginBottom: 12,
                backgroundColor: "#f9f9f9",
              }}
            >
              <Text style={{ fontWeight: "bold", color: "black" }}>
                Post #{post.id}
              </Text>

              <Text style={{ color: "black", marginTop: 4 }}>
                {post.title}
              </Text>

              <Text
                style={{ color: "gray", marginTop: 4 }}
                numberOfLines={2}
              >
                {post.body}
              </Text>
            </Pressable>
          ))
        )}
      </ScrollView>

      {/* FLOATING BUTTON */}
      <Pressable
        onPress={() => router.push("/addPost")}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          backgroundColor: "#007AFF",
          paddingVertical: 16,
          paddingHorizontal: 20,
          borderRadius: 30,
          elevation: 5,
          shadowColor: "#000",
          shadowOpacity: 0.2,
          shadowRadius: 5,
        }}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
          }}
        >
          + Add Post
        </Text>
      </Pressable>

    </View>
  );
}