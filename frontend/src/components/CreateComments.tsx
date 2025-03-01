
const CreateComments = ({thread}) => {
	return (
		<>
			<form className='fieldset w-full border border-base-300 p-4 mt-5 rounded-box'>
				<label className='fieldset-label'>Add a comment</label>
				<textarea
					className='textarea w-full'
					placeholder={`Type here to reply to ${thread.author}`}
				></textarea>

				<button type='submit' className='btn btn-neutral mt-4 w-xs'>
					Post comment
				</button>
			</form>
		</>
	);
};

export default CreateComments;
