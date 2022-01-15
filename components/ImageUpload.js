import { useState } from "react";
import axios from "axios";
import { ToastContainer, Slide, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Button from "./Button";
import styles from "@/styles/Form.module.css";
import { API_URL } from "@/config/urls";

export default function ImageUpload({ articleId, onImageUploaded }) {
  const [imageUrl, setImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    // Append data to the form
    const formData = new FormData();
    formData.append("files", imageUrl);
    formData.append("ref", "api::article.article");
    formData.append("refId", articleId);
    formData.append("field", "image");
    // Comunicate to API
    const { data, status } = await toast.promise(
      axios.post(`${API_URL}/api/upload`, formData),
      {
        pending: "Updating image, please wait...",
        success: "Image has been changed",
        error: "Error, please try again",
      },
      { theme: "dark" }
    );
    setIsLoading(false);
    // Result
    if (status !== 200) {
      toast.error("Something went wrong", { theme: "dark" });
    }
    onImageUploaded(data[0]);
  };

  const handleImageChange = (event) => {
    setImageUrl(event.target.files[0]);
  };

  return (
    <>
      <ToastContainer position="bottom-center" hideProgressBar={true} autoClose={3000} transition={Slide} />
      <span className={styles.input_label} style={{ marginBottom: "20px", display: "block" }}>
        Upload article image
      </span>
      <form onSubmit={handleSubmit}>
        <div className={styles.input_files}>
          <input type="file" onChange={handleImageChange} />
        </div>
        <Button fill buttonType="submit" onPending={isLoading}>
          Change
        </Button>
      </form>
    </>
  );
}
