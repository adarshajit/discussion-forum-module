import { useEffect, useState } from "react";
import { Thread } from "../../types";
import DiscussionApi from "../../api/discussion";
import DiscussionItem from "./DiscussionItem";

const DiscussionList = () => {
  const [threads, setThreads] = useState<Thread[]>([]);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
          const data = await DiscussionApi.getThreads();
          setThreads(data);
        }
      catch (error) {
        console.error("Error:", error);
      }
    };

    fetchThreads();
  }, []);

  return (
    <div className="p-10">
      <ul className="list bg-base-100 rounded-box shadow-md">
        {threads.map((thread: Thread) => (
          <div className="w-full">
            <DiscussionItem key={thread.id} thread={thread} />
          </div>
        ))}
      </ul>
    </div>
  );
};

export default DiscussionList;