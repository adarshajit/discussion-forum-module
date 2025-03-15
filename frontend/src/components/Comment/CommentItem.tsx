import { Comment } from "../../types"
import { DEFAULT_PROFILE_IMAGE_URL } from "../../utils/constants"

const CommentItem = ({comment}: {comment: Comment}) => {
  return (
    <li className="flex flex-col p-6 w-full max-w-xl min-w-xl min-h-20">
      <div className="flex py-4">
        <img className="size-12 rounded-box" src={comment.author.avatar_url ?? DEFAULT_PROFILE_IMAGE_URL}/>
        <div className="flex flex-col px-3 gap-1">
          <div className="text-lg font-semibold">{comment.author.username}</div>
          <div className="text-md font-bold opacity-60">
            <span>Replied on </span>{new Date(comment.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <p className="list-col-wrap text-lg">
        {comment.description}
      </p>
    </li>
  )
}

export default CommentItem