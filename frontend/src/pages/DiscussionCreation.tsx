import { useState } from "react";
import { useNavigate } from "react-router";
import discussionApi from "../api/discussion";
import { useAuth } from "../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

const DiscussionCreation = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const navigate = useNavigate();
  const {user} = useAuth()
  const queryClient = useQueryClient();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const threadData = {
      title,
      category,
      description,
      username: user?.username
    };

    try {
        await discussionApi.createThread(threadData);
        await queryClient.invalidateQueries({ queryKey: ["discussions"]});
        navigate("/");
      } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen gap-3">
      <h1 className="text-4xl font-bold">Start a Discussion!</h1>
      <p className="text-xl font-semibold text-gray-500">Have something on your mind? Create a thread and spark a conversation!</p>
      <form onSubmit={handleSubmit} className="fieldset w-6xl bg-base-200 border border-base-300 p-4 mt-10 rounded-box">
        <label className="fieldset-label">Title</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        
        <label className="fieldset-label">Category</label>
        <input
          type="text"
          className="input w-full"
          placeholder="Enter the category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        
        <label className="fieldset-label">Description</label>
        <textarea
          className="textarea w-full h-90"
          placeholder="Elaborate your discussion here.."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button type="submit" className="btn btn-neutral mt-4">Start Discussion</button>
      </form>
    </div>
  );
};

export default DiscussionCreation;