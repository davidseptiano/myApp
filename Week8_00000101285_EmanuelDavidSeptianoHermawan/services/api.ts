import axios from "axios";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

// GET ALL POSTS
export const getPosts = () => {
  return axios.get(`${BASE_URL}posts`);
};

// GET POST DETAIL
export const getPostDetail = (id: number) => {
  return axios.get(`${BASE_URL}posts/${id}`);
};

// GET USER DETAIL
export const getUserDetail = (id: number) => {
  return axios.get(`${BASE_URL}users/${id}`);
};

// GET COMMENTS
export const getComments = (postId: number) => {
  return axios.get(`${BASE_URL}posts/${postId}/comments`);
};

// POST DATA
export const postData = (data: {
  title: string;
  body: string;
  userId: number;
}) => {
  return axios.post(`${BASE_URL}posts`, data);
};