import { useEffect, useState } from "react";
import { Thread } from "../../types";
import DiscussionApi from "../../api/discussion";
import DiscussionItem from "./DiscussionItem";
import Loader from "../Loader";
import Search from "../Search";
import { useAuth } from "../../hooks/useAuth";

const DiscussionList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const {user} = useAuth();

  useEffect(() => {
    const fetchThreads = async () => {
      try {
          setLoading(true)
          const data = await DiscussionApi.getThreads();
          setThreads(data);
        }
      catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  if(loading) {
    return (
      <div className="w-1/2">
        <Loader message="Hang tight, fetching all the discussions for you! 😊"/>
      </div>
    )
  }

  return (
    <div className="p-10">
      <p className="text-3xl font-bold">Welcome back, {user?.username} ✨</p>
      <Search />
      <ul className="list bg-base-100 rounded-box shadow-md">
        {threads.map((thread: Thread) => (
          <div className="w-full" key={thread.id}>
            <DiscussionItem thread={thread} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionList;