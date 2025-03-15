import { useState } from "react";
import { ThreadDetails } from "../../types";
import commentApi from "../../api/comment";
import { useAuth } from "../../hooks/useAuth";

const CreateComments = ({thread}: {thread: ThreadDetails}) => {
	const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
	const {user} = useAuth();
	const {id, author } = thread;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      await commentApi.createComment(id, description, user?.username);
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
			setDescription("")
    }
  };
	return (
		<>
			<form className='fieldset w-full border border-base-300 p-4 mt-5 rounded-box' onSubmit={handleSubmit}>
				<label className='fieldset-label'>Add a comment</label>
				<textarea
					className='textarea w-full'
					placeholder={`Type here to reply to ${author.username}`}
					onChange={(e)=> setDescription(e.target.value)}
					disabled={isSubmitting}
					value={description}
					required
				></textarea>

				<button type='submit' className='btn btn-primary mt-4 w-xs'>
				{isSubmitting ? 'Posting...' : 'Post comment'}
				</button>
			</form>
		</>
	);
};

export default CreateComments;
