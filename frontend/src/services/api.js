import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});
export const uploadDocuments = async (files) => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await API.post("/upload/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const askQuestion = async (question) => {
  const response = await API.post("/chat/", {
    question: question,
  });

  return response.data;
};

export default API;