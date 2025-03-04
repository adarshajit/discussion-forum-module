import CommentItem from "./CommentItem"

const CommentsList = ({comments}) => {
  return (
    <>
      <p className="mt-10 text-lg font-bold">{comments.length} Comments</p>
      <ul className="list bg-base-100 rounded-box shadow-md">
      {comments.map((comment) => (
          <div className="w-full">
            <CommentItem key={comment.id} comment={comment} />
          </div>
        ))}
      </ul>
    </>
  )
}

export default CommentsList