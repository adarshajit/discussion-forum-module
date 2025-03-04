import { Link } from "react-router"
import { truncateString } from "../utils/truncateString"

const DiscussionItem = ({thread}) => {
  return (
    <> 
    <li className="flex flex-col p-6 max-w-3xl min-w-3xl gap-4">
      <div className="flex py-4">
        <img className="size-12 rounded-box" src="https://img.daisyui.com/images/profile/demo/1@94.webp"/>
        <div className="flex flex-col px-3 gap-1">
          <div className="text-lg font-semibold">{thread.author.username}</div>
          <div className="text-xs uppercase font-semibold opacity-60">{thread.author.role}</div>
        </div>
      </div>
      <p className="list-col-wrap text-lg">
        {truncateString(thread.description, 150)}
      </p>
      <div className="flex justify-end gap-3 pt-6">
        <Link className="btn btn-ghost text-lg" to={`/thread/${thread.id}`}>Read more</Link>
      </div>
    </li>
    <hr className="border border-gray-200"/>
  </>
  )
}

export default DiscussionItem