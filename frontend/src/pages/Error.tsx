
const Error = ({message}: {message: string}) => {
  return (
    <div className="flex justify-center items-center h-screen">
      <p className='text-3xl text-red-500 font-semibold'>{message}</p>
    </div>
  )
}

export default Error