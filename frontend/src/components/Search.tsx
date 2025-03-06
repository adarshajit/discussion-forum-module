const Search = () => {
	return (
		<div className='flex items-center gap-2 my-2'>
			<input
				type='text'
				placeholder='Search a thread'
				className='input input-neutral my-10 w-full border p-6'
			/>
			<button className='btn btn-primary p-6'>Search</button>
		</div>
	);
};

export default Search;
