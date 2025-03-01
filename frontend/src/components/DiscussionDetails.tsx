import { useParams } from "react-router"

const DiscussionDetails = () => {
  const {id} = useParams();

  return (
    <div>Discussion Thread - {id}</div>
  )
}

export default DiscussionDetails