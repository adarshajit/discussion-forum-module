
const Loader = ({message}: {message: string}) => {
	return (
		<div className='h-screen flex flex-col gap-4 justify-center items-center'>
			<p className='text-3xl font-semibold text-gray-500'>
				{message}
			</p>
			<span className='loading loading-dots loading-xl'></span>
		</div>
	);
};

export default Loader;
