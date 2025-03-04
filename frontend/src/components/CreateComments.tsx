import { useState } from "react";

const CreateComments = ({thread}) => {
	const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

	const {id, author } = thread;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`http://localhost:8000/forum/thread/${id}/comment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      });

      if (response.ok) {
        setDescription('');
      } else {
        console.error('Failed to post comment');
      }
    } catch (error) {
      console.error('Error posting comment:', error);
    } finally {
      setIsSubmitting(false);
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
