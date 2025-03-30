import { Link } from "react-router"
import { truncateString } from "../../utils/truncateString"
import { Thread } from "../../types"
import { DEFAULT_PROFILE_IMAGE_URL } from "../../utils/constants"

const DiscussionItem = ({thread}: {thread: Thread}) => {
  return (
    <li className="flex flex-col px-6 pt-5 max-w-3xl min-w-3xl gap-4">
      <div className="flex py-4 items-center">
        <img className="size-16 rounded-box" src={thread.author.avatar_url ?? DEFAULT_PROFILE_IMAGE_URL} alt="avatar_image"/>
        <div className="flex flex-col px-3 gap-1">
          <p className="text-lg font-semibold">{thread.author.username}</p>
          <p className="text-sm uppercase font-semibold opacity-60">{thread.author.role}</p>
          <p className="text-sm font-semibold opacity-60">Posted on {new Date(thread.created_at).toDateString()}</p>
        </div>
      </div>
      <p className="text-2xl font-semibold">{thread.title}</p>
      <p className="list-col-wrap text-lg">
        {truncateString(thread.description, 150)}
      </p>
      <div className="flex justify-end gap-3 pt-6">
        <Link className="btn btn-ghost text-lg" to={`/thread/${thread.id}`}>View Thread</Link>
      </div>
      <hr className="border border-gray-200"/>
    </li>
  )
}

export default DiscussionItem